import React, {
  useEffect,
  useState,
  ReactElement,
  useRef,
  useContext,
  ReactNode,
} from "react";
import { observer } from "mobx-react-lite";
import { makeAutoObservable, toJS } from "mobx";
import styled from "styled-components";
import { pdf } from "@react-pdf/renderer";
import useComponentSize from "@rehooks/component-size";
import {
  Document as ReactPDFDocument,
  Page,
  //@ts-ignore
} from "react-pdf/dist/esm/entry.webpack";

import Viewer from "../Viewer";
import Loader from "./Loader";

import { useWindowHeight, useDebounce } from "../../../../util/hooks";
import ResumeShape from "../../Resume.typing";
import { ResumeBubble } from "../../Resume.bubble";
import media from "../../../../util/media";
import theme, { ThemeShape } from "../../../../util/theme";

const PageWrapper = styled.div`
  position: sticky;
  overflow: hidden;
  top: ${({
    height,
    windowHeight,
    theme,
  }: {
    height: number;
    windowHeight: number;
    theme: ThemeShape;
  }) => theme.menuHeight / 2 + (windowHeight - height) / 2 + "px"};

  height: ${({
    height,
    windowHeight,
    theme,
  }: {
    height: number;
    windowHeight: number;
    theme: ThemeShape;
  }) =>
    height + theme.menuHeight > windowHeight
      ? windowHeight - theme.menuHeight - 2 * theme.spaceSmall + "px"
      : height + "px"};
  overflow-y: ${({
    height,
    windowHeight,
  }: {
    height: number;
    windowHeight: number;
  }) => (height + theme.menuHeight > windowHeight ? "scroll" : "auto")};
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  ${media.tablet`
    margin-top: ${({ theme }: { theme: ThemeShape }) => theme.space + "px"};
    margin-bottom: ${({ theme }: { theme: ThemeShape }) => theme.space + "px"};
  `};
`;

const DocumentWrapper = styled.div`
  position: relative;
  border-radius: 0;
  transition: ${({ theme }) => theme.cardShadowTransition};
  margin: ${({ theme }: { theme: ThemeShape; height: number }) =>
    `0 ${theme.space}px`};
  height: ${({ height }: { height: number }) => height + "px"};
  background: ${({ theme }) => theme.ivory};
  box-shadow: ${({ theme }) => theme.cardShadow};
`;

const DocWrapper = styled.div`
  display: ${({ isVisible }: { isVisible: boolean }) =>
    isVisible ? "block" : "none"};
`;

const Document = ({
  file,
  onDocumentLoad,
  children,
  isVisible,
}: {
  file: string;
  onDocumentLoad: Function;
  children: ReactNode;
  isVisible: boolean;
}) => (
  <DocWrapper isVisible={isVisible}>
    <ReactPDFDocument file={file} onLoadSuccess={onDocumentLoad}>
      {children}
    </ReactPDFDocument>
  </DocWrapper>
);

const PDFViewer = (props: { document: ReactElement; bare: boolean }) => {
  const [state, setState] = useState<{
    currentPage: number;
    numPages: number | null;
    document: string;
    loading: boolean;
    reload: string;
  }>({
    loading: true,
    document: "",
    numPages: null,
    reload: "",
    currentPage: 1,
  });
  const windowHeight = useWindowHeight();
  const debouncedWindowHeight = useDebounce(0, 200);
  const selfRef = useRef<HTMLDivElement>(null);
  let size = useComponentSize(selfRef);

  useEffect(() => {
    const renderDocument = async (doc: ReactElement) => {
      let blob: Blob | undefined = undefined;
      let retryAttempts = 0;

      if (!doc) {
        setState((prevState) => ({
          ...prevState,
          document: "",
        }));
        return;
      }

      setState((prevState) => ({
        ...prevState,
        loading: true,
      }));

      do {
        try {
          blob = await pdf(doc).toBlob();
        } catch (error) {
          await new Promise((resolve) => setTimeout(resolve, 150));
        }
      } while (!blob || retryAttempts > 10);

      URL.revokeObjectURL(state.document);

      if (blob) {
        setState((prevState) => ({
          ...prevState,
          document: URL.createObjectURL(blob),
        }));
      }
    };

    renderDocument(props.document);
    // eslint-disable-next-line
  }, [props, state.reload]);

  const onDocumentLoad = ({ numPages }: { numPages: number }) => {
    setState((prevState) => ({
      ...prevState,
      numPages,
      currentPage: Math.min(numPages, prevState.currentPage),
    }));
  };

  const onRenderSuccess = () => {
    setState((prevState) => ({
      ...prevState,
      loading: false,
    }));
  };

  const doc = (
    <Document
      isVisible={!state.loading}
      onDocumentLoad={onDocumentLoad}
      file={state.document}
      children={
        <Page
          onRenderSuccess={onRenderSuccess}
          pageNumber={props.bare ? 1 : state.currentPage}
        />
      }
    />
  );

  const changeSize =
    windowHeight < theme.menuHeight + size.width * 1.414141 + theme.space;

  return props.bare ? (
    <>
      <Loader />
      {doc}
    </>
  ) : (
    <PageWrapper
      ref={selfRef}
      height={
        changeSize
          ? windowHeight - 2 * theme.space - theme.menuHeight
          : size.width * 1.414141
      }
      windowHeight={debouncedWindowHeight || windowHeight}
    >
      <DocumentWrapper height={1.414141 * (size.width - 2 * theme.space)}>
        <Loader /> {doc}
      </DocumentWrapper>
    </PageWrapper>
  );
};

const Wrapper = styled.section`
  width: 100%;
  flex: 45%;
  box-sizing: border-box;
  text-align: center;

  canvas {
    width: 100% !important;
    height: auto !important;
  }

  canvas + div {
    display: none;
  }
`;

const Previewer = observer(
  ({
    bare,
    template,
    data,
  }: {
    bare: boolean;
    template?: "classic" | "calm";
    data?: ResumeShape;
  }) => {
    const resumeBubble = useContext(ResumeBubble);
    const { resume } = resumeBubble;
    makeAutoObservable(toJS(resume));
    const content = data || resume;

    return (
      <Wrapper>
        <PDFViewer
          bare={bare}
          document={{
            ...Viewer,
            props: {
              data: {
                ...content,
                meta: {
                  ...content.meta,
                  template: template || content.meta.template,
                },
              },
            },
          }}
        />
      </Wrapper>
    );
  }
);

export default Previewer;

import React, {
  useEffect,
  useState,
  ReactElement,
  MouseEvent,
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

import theme from "../../../../util/theme";
import { useWindowHeight, useDebounce } from "../../../../util/hooks";
import ResumeShape from "../../Resume.bubble.typing";
import { ResumeBubble } from "../../Resume.bubble";
import Loader from "./Loader";

const PageWrapper = styled.div`
  position: sticky;
  overflow: hidden;
  top: ${({ height, windowHeight }: { height: number; windowHeight: number }) =>
    theme.menuHeight / 2 + (windowHeight - height) / 2 + "px"};
`;

const DocumentWrapper = styled.div`
  position: relative;
  border-radius: 0;
  transition: ${({ theme }) => theme.cardShadowTransition};
  margin: ${({ theme }) => theme.space + "px"};
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
  }>({
    loading: true,
    document: "",
    numPages: null,
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
          twinDocument: "",
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
  }, [props]);

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

  const onPreviousPage = () => {
    setState((prevState) => ({
      ...prevState,
      currentPage: prevState.currentPage - 1,
    }));
  };

  const onNextPage = () => {
    setState((prevState) => ({
      ...prevState,
      currentPage: prevState.currentPage + 1,
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

  return props.bare ? (
    <>
      <Loader />
      {doc}
    </>
  ) : (
    <PageWrapper
      ref={selfRef}
      height={size.width * 1.414141}
      windowHeight={debouncedWindowHeight || windowHeight}
    >
      <DocumentWrapper height={(size.width - 2 * theme.space) * 1.414141}>
        <Loader />
        {doc}
      </DocumentWrapper>
      {state.numPages && (
        <PageNavigator
          currentPage={state.currentPage}
          numPages={state.numPages}
          onNextPage={onNextPage}
          onPreviousPage={onPreviousPage}
        />
      )}
      <Download
        fileName={"your-resume.pdf"}
        label={"Download free"}
        url={state.document}
      />
    </PageWrapper>
  );
};

const NavigatorWrapper = styled.div`
  display: flex;
  height: 32px;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.black};
`;

const PageIndicator = styled.div`
  margin: 0px 12px;
`;

const PageNavigator = ({
  currentPage,
  numPages,
  onPreviousPage,
  onNextPage,
}: {
  currentPage: number;
  numPages: number;
  onPreviousPage: (event: MouseEvent) => void;
  onNextPage: (event: MouseEvent) => void;
}) => {
  return numPages ? (
    <NavigatorWrapper>
      {currentPage !== 1 && <div onClick={onPreviousPage}>{"<"}</div>}
      <PageIndicator>{`Page ${currentPage} / ${numPages}`}</PageIndicator>
      {currentPage !== numPages && <div onClick={onNextPage}>{">"}</div>}
    </NavigatorWrapper>
  ) : null;
};

const DownloadWrapper = styled.div`
  flex: 100%;
`;

const Download = ({
  url,
  fileName,
  label,
}: {
  url: string | null;
  fileName: string;
  label: string;
}) => {
  return url ? (
    <DownloadWrapper>
      <a
        download={fileName}
        href={url}
        target={"_blank"}
        rel="noopener noreferrer"
      >
        {label}
      </a>
    </DownloadWrapper>
  ) : null;
};

const Wrapper = styled.section`
  width: 100%;
  flex: 35%;
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

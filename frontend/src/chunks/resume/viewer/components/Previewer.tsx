import React, {
  useEffect,
  useState,
  ReactElement,
  MouseEvent,
  useRef,
  useContext,
} from "react";
import { observer } from "mobx-react-lite";
import { makeAutoObservable, toJS } from "mobx";

import styled from "styled-components";
import { pdf } from "@react-pdf/renderer";
import useComponentSize from "@rehooks/component-size";
//@ts-ignore
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";

import Viewer from "../Viewer";

import theme from "../../../../util/theme";
import media from "../../../../util/media";
import { useWindowHeight, useDebounce } from "../../../../util/hooks";
import ResumeShape from "../../Resume.typing";
import { ResumeBubble } from "../../ResumeBubble";

const PageWrapper = styled.div`
  position: sticky;
  overflow: hidden;
  top: ${({ height, windowHeight }: { height: number; windowHeight: number }) =>
    theme.menuHeight / 2 + (windowHeight - height) / 2 + "px"};
`;

const DocumentWrapper = styled.div`
  border-radius: 0;
  transition: ${({ theme }) => theme.cardShadowTransition};
  margin: ${({ theme }) => theme.space + "px"};
  height: ${({ height }: { height: number }) => height + "px"};
  background: ${({ theme }) => theme.white};
  box-shadow: ${({ theme }) => theme.cardShadow};
`;

const DocumentHolder = styled.div`
  display: ${({ isActive }: { isActive: boolean }) =>
    isActive ? "block" : "none"};
`;

const PDFViewer = (props: { document: ReactElement; bare: boolean }) => {
  const [state, setState] = useState<{
    currentPage: number;
    numPages: number | null;
    document: string;
    twinDocument: string;
    twinActive: boolean;
  }>({
    document: "",
    twinDocument: "",
    numPages: null,
    currentPage: 1,
    twinActive: false,
  });
  const windowHeight = useWindowHeight();
  const debouncedWindowHeight = useDebounce(windowHeight, 200);
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

      setState((prevState) => ({ ...prevState }));
      do {
        try {
          blob = await pdf(doc).toBlob();
        } catch (error) {
          await new Promise((resolve) => setTimeout(resolve, 250));
        }
      } while (!blob || retryAttempts > 2);

      if (state.twinActive) {
        setState((prevState) => ({
          ...prevState,
          document: URL.createObjectURL(blob),
        }));

        setTimeout(() => {
          URL.revokeObjectURL(state.twinDocument);
          setState((prevState) => ({ ...prevState, twinActive: false }));
        }, 500);
      } else {
        setState((prevState) => ({
          ...prevState,
          twinDocument: URL.createObjectURL(blob),
        }));

        setTimeout(() => {
          URL.revokeObjectURL(state.document);
          setState((prevState) => ({ ...prevState, twinActive: true }));
        }, 500);
      }
    };

    renderDocument(props.document);

    // eslint-disable-next-line
  }, [props, setState]);

  const onDocumentLoad = ({ numPages }: { numPages: number }) => {
    const { currentPage } = state;

    setState((prevState) => ({
      ...prevState,
      numPages,
      currentPage: Math.min(currentPage),
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

  const document = (
    <DocumentHolder isActive={!state.twinActive}>
      <Document file={state.document} onLoadSuccess={onDocumentLoad} {...props}>
        <Page pageNumber={state.currentPage} />
      </Document>
    </DocumentHolder>
  );

  const twinDocument = (
    <DocumentHolder isActive={state.twinActive}>
      <Document
        file={state.twinDocument}
        onLoadSuccess={onDocumentLoad}
        {...props}
      >
        <Page pageNumber={state.currentPage} />
      </Document>
    </DocumentHolder>
  );

  return props.bare ? (
    <>
      {document}
      {twinDocument}
    </>
  ) : (
    <PageWrapper
      ref={selfRef}
      height={size.width * 1.414141}
      windowHeight={debouncedWindowHeight}
    >
      <DocumentWrapper height={(size.width - 2 * theme.space) * 1.414141}>
        {document}
        {twinDocument}
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
        url={state.twinActive ? state.twinDocument : state.document}
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

  ${media.tablet`
    display: none;
  `}
`;

const Previewer = observer(
  ({
    bare,
    template,
    data,
    className,
  }: {
    bare: boolean;
    template?: "classic" | "calm";
    data?: ResumeShape;
    className?: string;
  }) => {
    const resumeBubble = useContext(ResumeBubble);
    const { resume } = resumeBubble;
    makeAutoObservable(toJS(resume));
    const content = data || resume;

    return (
      <Wrapper className={className}>
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

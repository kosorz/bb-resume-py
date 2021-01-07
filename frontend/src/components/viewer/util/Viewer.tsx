import React, {
  useEffect,
  useState,
  useContext,
  ReactElement,
  MouseEvent,
  useRef,
} from "react";
import { observer } from "mobx-react-lite";
import styled from "styled-components";
import { pdf } from "@react-pdf/renderer";
import useComponentSize from "@rehooks/component-size";
//@ts-ignore
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";

import Resume from "../Resume";

import MetaShape from "../../../typings/Meta.typing";
import media from "../../../styled/media";
import { ResumeBubble } from "../../../bubbles/ResumeBubble";
import { useWindowHeight, useDebounce } from "../../../util/hooks";

const PageWrapper = styled.div`
  position: sticky;
  top: ${({ theme }) => theme.spaceSmall + "px"};
  overflow: hidden;
  top: ${({ height, windowHeight }: { height: number; windowHeight: number }) =>
    (windowHeight - height) / 2 + "px"};
`;

const DocumentWrapper = styled.div`
  border-radius: 0;
  box-shadow: ${({ theme }) => theme.cardShadow};
  transition: ${({ theme }) => theme.cardShadowTransition};
  margin: ${({ theme }) => theme.spaceSmall + "px"};
`;

const PDFViewer = (props: {
  onRenderError: Function;
  document: ReactElement;
  bare: boolean;
}) => {
  const [state, setState] = useState<{
    loading: boolean;
    currentPage: number;
    numPages: number | null;
    document: string | null;
  }>({
    loading: true,
    document: null,
    numPages: null,
    currentPage: 1,
  });
  const windowHeight = useWindowHeight();
  const debouncedWindowHeight = useDebounce(windowHeight, 200);
  const selfRef = useRef<HTMLDivElement>(null);
  let size = useComponentSize(selfRef);

  const bubble = useContext(ResumeBubble);

  useEffect(() => {
    const renderDocument = async (doc: ReactElement) => {
      let blob: Blob | undefined = undefined;
      let retryAttempts = 0;

      if (!doc) {
        setState((prevState) => ({ ...prevState, document: null }));
        return;
      }

      setState((prevState) => ({ ...prevState, loading: true }));
      do {
        try {
          blob = await pdf(doc).toBlob();
        } catch (error) {
          await new Promise((resolve) => setTimeout(resolve, 250));
          props.onRenderError && props.onRenderError(error.message);
        }
      } while (!blob || retryAttempts > 2);

      setState((prevState) => ({
        ...prevState,
        document: URL.createObjectURL(blob),
        loading: false,
      }));
    };

    renderDocument(props.document);
  }, [props, setState, bubble.resume]);

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
    <Document file={state.document} onLoadSuccess={onDocumentLoad} {...props}>
      <Page pageNumber={state.currentPage} />
    </Document>
  );

  return props.bare ? (
    document
  ) : (
    <PageWrapper
      ref={selfRef}
      height={size.width * 1.414141}
      windowHeight={debouncedWindowHeight}
    >
      <DocumentWrapper>{document}</DocumentWrapper>
      {state.numPages && (
        <PageNavigator
          currentPage={state.currentPage}
          numPages={state.numPages}
          onNextPage={onNextPage}
          onPreviousPage={onPreviousPage}
        />
      )}
      {state.document && (
        <Download
          fileName={"your-resume.pdf"}
          label={"Download free"}
          url={state.document}
        />
      )}
    </PageWrapper>
  );
};

const NavigatorWrapper = styled.div`
  display: flex;
  height: 64px;
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
  url: string;
  fileName: string;
  label: string;
}) => {
  return (
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
  );
};

const Wrapper = styled.section`
  width: 100%;
  flex: 33%;
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

const Viewer = observer(
  ({
    meta,
    bare,
    template,
  }: {
    bare: boolean;
    meta: MetaShape;
    template?: "classic" | "calm";
  }) => {
    const resumeBubble = useContext(ResumeBubble);
    const { updatedAt, resume } = resumeBubble;

    return (
      <Wrapper>
        {updatedAt && (
          <PDFViewer
            bare={bare}
            onRenderError={() => console.log("error")}
            document={{
              ...Resume,
              props: {
                data: resume,
                meta: { ...meta, template: template || meta.template },
              },
            }}
          />
        )}
      </Wrapper>
    );
  }
);

export default Viewer;

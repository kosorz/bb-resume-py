import React, {
  useEffect,
  useState,
  useContext,
  ReactElement,
  MouseEvent,
} from "react";
import { observer } from "mobx-react-lite";
import styled from "styled-components";
import { pdf } from "@react-pdf/renderer";
//@ts-ignore
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";

import Resume from "../Resume";

import MetaShape from "../../../typings/Meta.typing";
import loadFonts from "./fonts/fonts-loader";
import media from "../../../styled/media";
import { ResumeBubble } from "../../../bubbles/ResumeBubble";

loadFonts();

const PageWrapper = styled.div`
  position: sticky;
  top: ${({ theme }) => theme.space + "px"};
  overflow: hidden;

  span {
    display: none;
  }
`;

const DocumentWrapper = styled.div`
  color: #f8f9fa;
  border-radius: ${({ theme }) => theme.spaceSmall / 2 + "px"};
`;

const PDFViewer = (props: {
  onRenderError: Function;
  document: ReactElement;
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

  const bubble = useContext(ResumeBubble);

  useEffect(() => {
    const renderDocument = (doc: ReactElement) => {
      if (!doc) {
        setState((prevState) => ({ ...prevState, document: null }));
        return;
      }

      setState((prevState) => ({ ...prevState, loading: true }));

      try {
        pdf(doc)
          .toBlob()
          .then((blob) => {
            const url = URL.createObjectURL(blob);

            setState((prevState) => ({
              ...prevState,
              document: url,
              loading: false,
            }));
          });
      } catch (error) {
        props.onRenderError && props.onRenderError(error.message);
      }
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

  return (
    <PageWrapper>
      <DocumentWrapper>
        <Document
          file={state.document}
          onLoadSuccess={onDocumentLoad}
          {...props}
        >
          <Page pageNumber={state.currentPage} />
        </Document>
      </DocumentWrapper>
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
  flex: 35%;
  box-sizing: border-box;
  text-align: center;

  canvas {
    width: 100% !important;
    height: auto !important;
    border-radius: ${({ theme }) => theme.spaceSmall / 2 + "px"};
  }

  ${media.tablet`
    display: none;
  `}
`;

const Viewer = observer(({ meta }: { meta: MetaShape }) => {
  const resumeBubble = useContext(ResumeBubble);
  const { updatedAt, resume, activeSection } = resumeBubble;

  return (
    <Wrapper>
      {updatedAt && (
        <PDFViewer
          onRenderError={() => console.log("error")}
          document={{
            ...Resume,
            props: { meta, activeSection, data: resume },
          }}
        />
      )}
    </Wrapper>
  );
});

export default Viewer;

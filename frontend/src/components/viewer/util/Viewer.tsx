import React, { useEffect, useState, useContext, ReactElement } from "react";
import { observer } from "mobx-react-lite";
import styled from "styled-components";
import { pdf } from "@react-pdf/renderer";
//@ts-ignore
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";

import Resume from "../Resume";

import { ResumeBubble } from "../../../bubbles/ResumeBubble";
import Navigator from "../../../typings/PageNavigator.typing";
import loadFonts from "./fonts/fonts-loader";

loadFonts();

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-content: center;
`;

const DocumentWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  height: 100%;
`;

const StyledPage = styled(Page)`
  width: 100%;
`;

const PDFViewer = (props: {
  onUrlChange: Function;
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

            if (props.onUrlChange) {
              props.onUrlChange(url);
            }

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
    <Wrapper>
      <DocumentWrapper>
        <Document
          file={state.document}
          onLoadSuccess={onDocumentLoad}
          {...props}
        >
          <StyledPage renderMode="svg" pageNumber={state.currentPage} />
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
    </Wrapper>
  );
};

const NavigatorWrapper = styled.div`
  display: flex;
  height: 64px;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.black};
`;

const PageIndicator = styled.span`
  margin: 0px 12px;
`;

const PageNavigator = ({
  currentPage,
  numPages,
  onPreviousPage,
  onNextPage,
}: Navigator) => {
  return numPages ? (
    <NavigatorWrapper>
      {currentPage !== 1 && <div onClick={onPreviousPage}>{"<"}</div>}
      <PageIndicator>{`Page ${currentPage} / ${numPages}`}</PageIndicator>
      {currentPage !== numPages && <div onClick={onNextPage}>{">"}</div>}
    </NavigatorWrapper>
  ) : null;
};

const Viewer = observer(({ onUrlChange }: { onUrlChange: Function }) => {
  const resumeBubble = useContext(ResumeBubble);

  return (
    <PDFViewer
      onRenderError={() => console.log("error")}
      onUrlChange={onUrlChange}
      document={{
        ...Resume,
        props: {
          updatedAt: resumeBubble.updatedAt,
          data: resumeBubble.resume,
          theme: resumeBubble.theme,
        },
      }}
    />
  );
});

export default Viewer;

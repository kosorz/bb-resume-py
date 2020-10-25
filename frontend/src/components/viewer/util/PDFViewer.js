import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { pdf } from "@react-pdf/renderer";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";

import PageNavigator from "./PageNavigator";
import { ResumeBubble } from "../../../bubbles/ResumeBubble";

const Wrapper = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  position: relative;
  flex-direction: column;
`;

const DocumentWrapper = styled.div`
  flex: 1;
  padding: 1em;
  display: flex;
  z-index: 500;
  align-items: center;
  justify-content: center;
`;

const Message = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  z-index: 1000;
  position: absolute;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  transition: all 1s;
  opacity: ${(props) => (props.active ? 1 : 0)};
  pointer-events: ${(props) => (props.active ? "all" : "none")};
`;

const PDFViewer = (props) => {
  const [state, setState] = useState({
    loading: true,
    document: null,
    numPages: null,
    currentPage: 1,
  });

  const bubble = useContext(ResumeBubble);

  useEffect(() => {
    const renderDocument = (doc) => {
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

  const onDocumentLoad = ({ numPages }) => {
    const { currentPage } = state;

    setState((prevState) => ({
      ...prevState,
      numPages,
      currentPage: Math.min(currentPage, numPages),
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
      <Message active={state.loading}>Rendering PDF...</Message>
      <Message active={!state.loading && !props.document}>
        You are not rendering a valid document
      </Message>
      <DocumentWrapper>
        <Document
          file={state.document}
          onLoadSuccess={onDocumentLoad}
          {...props}
        >
          <Page renderMode="svg" pageNumber={state.currentPage} />
        </Document>
      </DocumentWrapper>
      <PageNavigator
        currentPage={state.currentPage}
        numPages={state.numPages}
        onNextPage={onNextPage}
        onPreviousPage={onPreviousPage}
      />
    </Wrapper>
  );
};

export default PDFViewer;

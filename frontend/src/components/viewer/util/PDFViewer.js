import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { pdf, Font } from "@react-pdf/renderer";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";

import PageNavigator from "./PageNavigator";
import { ResumeBubble } from "../../../bubbles/ResumeBubble";

//@ts-ignore
import RobotoBold from "./fonts/Roboto-Bold.ttf";
//@ts-ignore
import RobotoLight from "./fonts/Roboto-Light.ttf";
//@ts-ignore
import RobotoRegular from "./fonts/Roboto-Regular.ttf";
//@ts-ignore
import RobotoMedium from "./fonts/Roboto-Medium.ttf";
//@ts-ignore
import RobotoBlack from "./fonts/Roboto-Black.ttf";

const fonts = [
  { family: "Roboto-Light", src: RobotoLight },
  { family: "Roboto-Regular", src: RobotoRegular },
  { family: "Roboto-Medium", src: RobotoMedium },
  { family: "Roboto-Bold", src: RobotoBold },
  { family: "Roboto-Black", src: RobotoBlack },
];

fonts.map((f) =>
  Font.register({
    ...f,
    format: "truetype",
  })
);

Font.registerEmojiSource({
  format: "png",
  url: "https://twemoji.maxcdn.com/2/72x72/",
});

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
  min-height: 800px;
  align-items: center;
  justify-content: center;
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

import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import styled, { ThemeProvider } from "styled-components";

import Viewer from "./components/viewer/util/Viewer";
import Editor from "./components/editor/Editor";
import Fonts from "./components/page/fonts/fonts-loader";

import ResumeBubbleProvider from "./bubbles/ResumeBubble";
import theme from "./styled/theme";
import { ResumeBubble } from "./bubbles/ResumeBubble";

const Wrapper = styled.section`
  display: flex;
  flex-wrap: wrap;
  padding: 0 ${({ theme }) => theme.spaceSmall + "px"};
  padding-top: ${({ theme }) => theme.menuHeight + "px"};
  margin: auto;
  max-width: 1600px;
`;

const Menu = styled.section`
  background: ${({ theme }) => theme.white};
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 3;
  height: ${({ theme }) => theme.menuHeight + "px"};
  box-shadow: ${({ theme }) => theme.cardShadow};
  transition: ${({ theme }) => theme.cardShadowTransition};
`;

const Resume = observer(() => {
  const resumeBubble = useContext(ResumeBubble);
  const { resume, getResume } = resumeBubble;
  const { meta } = resume;

  useEffect(() => {
    getResume();
  }, [getResume]);

  return (
    <Wrapper>
      {meta && <Editor />}
      {meta && <Viewer bare={false} meta={meta} />}
    </Wrapper>
  );
});

const Document = observer(() => {
  return (
    <ResumeBubbleProvider>
      <Fonts />
      <Resume />
    </ResumeBubbleProvider>
  );
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Menu />
      <Document />
    </ThemeProvider>
  );
}

export default App;

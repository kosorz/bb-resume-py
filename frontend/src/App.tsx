import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import styled, { ThemeProvider } from "styled-components";

import GlobalFonts from "./components/page/fonts/fonts-loader";
import Viewer from "./components/viewer/util/Viewer";
import Editor from "./components/editor/Editor";

import theme from "./styled/theme";
import ResumeBubble from "./bubbles/ResumeBubble";
import { ResumeBubble as Bubble } from "./bubbles/ResumeBubble";

const Wrapper = styled.section`
  display: flex;
  flex-wrap: wrap;
  padding: 0 ${({ theme }) => theme.spaceSmall + "px"};
  margin: auto;
  max-width: 1600px;
`;

const BBResume = observer(() => {
  const resumeBubble = useContext(Bubble);
  const { resume, getResume } = resumeBubble;
  const { meta } = resume;

  useEffect(() => {
    getResume();
  }, [getResume]);

  return (
    <Wrapper>
      {meta && <Editor meta={meta} />}
      {meta && <Viewer meta={meta} />}
    </Wrapper>
  );
});

function App() {
  return (
    <ResumeBubble>
      <GlobalFonts />
      <ThemeProvider theme={theme}>
        <BBResume />
      </ThemeProvider>
    </ResumeBubble>
  );
}

export default App;

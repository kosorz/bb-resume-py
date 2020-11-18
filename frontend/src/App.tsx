import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";

import ResumeBubble from "./bubbles/ResumeBubble";
import Editor from "./components/editor/Editor";
import styled, { ThemeProvider } from "styled-components";
import Viewer from "./components/viewer/util/Viewer";
import media from "./styled/media";
import theme from "./styled/theme";
import { ResumeBubble as Bubble } from "./bubbles/ResumeBubble";

const Wrapper = styled.section`
  display: flex;
  flex-wrap: wrap;
  padding: ${({ theme }) => theme.space + "px"};
  margin: auto;
  max-width: 1600px;

  ${media.phone`
    //@ts-ignore
    padding: ${({ theme }) => theme.spaceSmall + "px"}
  `};
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
      <ThemeProvider theme={theme}>
        <BBResume />
      </ThemeProvider>
    </ResumeBubble>
  );
}

export default App;

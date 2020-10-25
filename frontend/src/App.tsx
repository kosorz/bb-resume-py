import React from "react";

import ResumeBubble from "./bubbles/ResumeBubble";
import Editor from "./components/editor/Editor";
import styled from "styled-components";
import Viewer from "./components/viewer/util/Viewer";

const Wrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
`;

function App() {
  return (
    <ResumeBubble>
      <Wrapper>
        <Editor />
        <Viewer />
      </Wrapper>
    </ResumeBubble>
  );
}

export default App;

import React, { useState } from "react";

import ResumeBubble from "./bubbles/ResumeBubble";
import Editor from "./components/editor/Editor";
import styled from "styled-components";
import Viewer from "./components/viewer/util/Viewer";
import Download from "./components/page/Download";

const Wrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
`;

function App() {
  const [downloadUrl, setDownloadUrl] = useState<string>("");
  return (
    <ResumeBubble>
      <Wrapper>
        <Editor />
        <Viewer onUrlChange={setDownloadUrl} />
      </Wrapper>
      {downloadUrl && <Download url={downloadUrl} />}
    </ResumeBubble>
  );
}

export default App;

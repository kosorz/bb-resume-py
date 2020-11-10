import React, { useState } from "react";

import ResumeBubble from "./bubbles/ResumeBubble";
import Editor from "./components/editor/Editor";
import styled, { ThemeProvider } from "styled-components";
import Viewer from "./components/viewer/util/Viewer";
import Download from "./components/page/Download";
import media from "./styled/media";
import theme from "./styled/theme";

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

function App() {
  const [downloadUrl, setDownloadUrl] = useState<string>("");
  return (
    <ResumeBubble>
      <ThemeProvider theme={theme}>
        <Wrapper>
          <Editor />
          <Viewer onUrlChange={setDownloadUrl} />
          {downloadUrl && (
            <Download
              fileName={"your-resume.pdf"}
              label={"Download free"}
              url={downloadUrl}
            />
          )}
        </Wrapper>
      </ThemeProvider>
    </ResumeBubble>
  );
}

export default App;

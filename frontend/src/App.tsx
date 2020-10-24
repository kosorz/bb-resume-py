import React from "react";

import ResumeBubble from "./bubbles/ResumeBubble";
import Resume from "./components/editor/Resume";

function App() {
  return (
    <ResumeBubble>
      <Resume />
    </ResumeBubble>
  );
}

export default App;

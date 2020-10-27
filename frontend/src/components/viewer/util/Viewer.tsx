import React, { useContext } from "react";

import PDFViewer from "./PDFViewer";
import Resume from "../Resume";
import { observer } from "mobx-react-lite";
import { ResumeBubble } from "../../../bubbles/ResumeBubble";

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

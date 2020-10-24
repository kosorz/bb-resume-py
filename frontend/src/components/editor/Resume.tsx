import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";

import Experience from "./sections/Experience";
import Info from "./sections/Info";
import Skills from "./sections/Skills";
import { ResumeBubble } from "../../bubbles/ResumeBubble";

const Resume = observer(() => {
  const resumeBubble = useContext(ResumeBubble);

  useEffect(() => {
    resumeBubble.setResume();
  }, [resumeBubble]);

  return (
    <section>
      <Info />
      {resumeBubble.resume.skills && !resumeBubble.resume.skills.deleted && (
        <Skills />
      )}
      {resumeBubble.resume.experience &&
        !resumeBubble.resume.experience.deleted && <Experience />}
    </section>
  );
});

export default Resume;

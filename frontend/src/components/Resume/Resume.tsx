import React, { useContext, useEffect } from "react";
import cn from "classnames";
import { observer } from "mobx-react-lite";

import Experience from "../Experience/Experience";
import Info from "../Info/Info";
import Skills from "../Skills/Skills";
import { ResumeBubble } from "../../Bubbles/ResumeBubble";
import { ResumeEditor } from "./Resume.typing";

import style from "./Resume.module.scss";

const Resume = observer(({ className }: ResumeEditor) => {
  const resumeBubble = useContext(ResumeBubble);

  useEffect(() => {
    resumeBubble.setResume();
  }, [resumeBubble]);

  return (
    <section className={cn(style["Resume"], className)}>
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

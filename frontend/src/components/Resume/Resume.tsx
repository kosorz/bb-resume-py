import React, { useContext, useEffect } from "react";
import cn from "classnames";
import { observer } from "mobx-react-lite";

import Experience from "../Experience/Experience";
import Info from "../Info/Info";
import Skills from "../Skills/Skills";
import { MobxContext } from "../../mobx";
import { ResumeEditor } from "./Resume.typing";

import style from "./Resume.module.scss";

const Resume = observer(({ editable = true, className }: ResumeEditor) => {
  const store = useContext(MobxContext);

  useEffect(() => {
    editable && store.setResume();
  }, [editable, store]);

  return (
    <div className={cn(style["Resume"], className)}>
      <Info />
      {store.resume.skills && !store.resume.skills.deleted && <Skills />}
      {store.resume.experience && !store.resume.experience.deleted && (
        <Experience />
      )}
    </div>
  );
});

export default Resume;

import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import styled from "styled-components";

import Experience from "./sections/Experience";
import Info from "./sections/Info";
import Skills from "./sections/Skills";
import { ResumeBubble } from "../../bubbles/ResumeBubble";

const Wrapper = styled.section`
  flex: 50%;
  flex-grow: 0;
`;

const Editor = observer(() => {
  const resumeBubble = useContext(ResumeBubble);

  useEffect(() => {
    resumeBubble.setResume();
  }, [resumeBubble]);

  return (
    <Wrapper>
      {resumeBubble.resume.info && <Info />}
      {resumeBubble.resume.skills && !resumeBubble.resume.skills.deleted && (
        <Skills />
      )}
      {resumeBubble.resume.experience &&
        !resumeBubble.resume.experience.deleted && <Experience />}
    </Wrapper>
  );
});

export default Editor;

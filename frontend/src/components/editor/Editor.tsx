import React, { useContext, useEffect, ReactElement } from "react";
import { observer } from "mobx-react-lite";
import styled from "styled-components";

import Experience from "./sections/Experience";
import Info from "./sections/Info";
import Skills from "./sections/Skills";
import Column from "./sections/parts/Column";

import { buildEditor } from "../../util/fns";
import { ResumeBubble } from "../../bubbles/ResumeBubble";
import media from "../../styled/media";

const Wrapper = styled.section`
  flex: 65%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding-right: ${({ theme }) => theme.space + "px"};

  ${media.tablet`
    padding-right: 0;
  `};
  /* ${media.tablet`
    display: none;
  `} */
`;

const Editor = observer(() => {
  const resumeBubble = useContext(ResumeBubble);
  const { resume, setResume } = resumeBubble;
  const { skills, experience, info, meta } = resume;
  const { left, right } = meta.columns;

  useEffect(() => {
    setResume();
  }, [setResume]);

  const sections: { [key: string]: ReactElement | undefined } = {
    skills: buildEditor(Skills, skills && !skills.unlisted, "skills-editor"),
    experience: buildEditor(
      Experience,
      experience && !experience.unlisted,
      "experience-editor"
    ),
  };

  return (
    <Wrapper>
      {info && <Info />}
      {left.length > 0 && (
        <Column title={"Column I"}>
          {left.map((member) => sections[member])}
        </Column>
      )}
      {right.length > 0 && (
        <Column title={"Column II"}>
          {right.map((member) => sections[member])}
        </Column>
      )}
    </Wrapper>
  );
});

export default Editor;

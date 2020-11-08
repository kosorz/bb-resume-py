import React, { useContext, useEffect, ReactElement } from "react";
import { observer } from "mobx-react-lite";
import styled from "styled-components";

import Experience from "./sections/Experience";
import Info from "./sections/Info";
import Skills from "./sections/Skills";
import Column from "./sections/parts/Column";

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

  const getPosition = (section: string) => {
    return {
      isFirst: left[0] === section || right[0] === section,
      isLast:
        left[left.length - 1] === section ||
        right[right.length - 1] === section,
    };
  };

  const sections: { [key: string]: ReactElement | undefined } = {
    skills:
      skills && !skills.unlisted ? (
        <Skills {...getPosition("skills")} />
      ) : undefined,
    experience:
      experience && !experience.unlisted ? (
        <Experience {...getPosition("experience")} />
      ) : undefined,
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

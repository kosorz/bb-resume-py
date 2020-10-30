import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import styled from "styled-components";

import Experience from "./sections/Experience";
import Info from "./sections/Info";
import Skills from "./sections/Skills";
import { ResumeBubble } from "../../bubbles/ResumeBubble";
import media from "../../styled/media";

const Wrapper = styled.section`
  flex: 60%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding-right: ${({ theme }) => theme.space + "px"};

  ${media.tablet`
    //@ts-ignore
    padding-right: 0;
  `};
  /* ${media.tablet`
    display: none;
  `} */
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

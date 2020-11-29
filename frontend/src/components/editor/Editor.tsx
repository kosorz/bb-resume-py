import React, { useContext, ReactElement } from "react";
import { observer } from "mobx-react-lite";
import styled from "styled-components";

import Experience from "./sections/Experience";
import Info from "./sections/Info";
import Skills from "./sections/Skills";
import Column from "./sections/parts/Column";
import Meta from "./sections/Meta";
import Gallery from "./gallery/Gallery";

import { ResumeBubble } from "../../bubbles/ResumeBubble";
import { ResumeEditor } from "../../typings/Resume.typing";
import media from "../../styled/media";

const Wrapper = styled.section`
  flex: 67%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  margin-top: ${({ theme }) => theme.space + "px"};

  /* ${media.tablet`
    display: none;
  `} */
`;

export const Title = styled.h1`
  margin: 0;
  margin-bottom: ${({ theme }) => theme.spaceSmall + "px"};
  padding: ${({ theme }) => theme.spaceSmall + "px"};
  color: ${({ theme }) => theme.main};
  background-color: ${({ theme }) => theme.background};
  text-decoration: underline;
  position: sticky;
  top: 0;
  z-index: 10;
  overflow: hidden;
`;

const Editor = observer(({ meta }: ResumeEditor) => {
  const resumeBubble = useContext(ResumeBubble);
  const { resume } = resumeBubble;
  const { skills, experience, info } = resume;
  const { content } = meta;
  const { full, split } = content;
  const { layout } = meta.paper;

  const sections: { [key: string]: ReactElement | undefined } = {
    experience: experience ? (
      <Experience key={"experience-editor"} />
    ) : undefined,
    skills: skills ? <Skills key={"skills-editor"} /> : undefined,
  };

  const displaySections = (order: string[]) =>
    order.map((member) => sections[member]);

  const availablePicks = Object.keys(sections).filter((s) => !sections[s]);

  return (
    <Wrapper>
      <Title>Settings</Title>
      {availablePicks.length > 0 && <Gallery availablePicks={availablePicks} />}
      <Meta />
      <Title>Basic Information</Title>
      {info && <Info />}
      {layout === "split" && (
        <>
          {split.leftOrder.length > 0 && (
            <Column title={"Left column"}>
              {displaySections(split.leftOrder)}
            </Column>
          )}
          {split.rightOrder.length > 0 && (
            <Column title={"Right column"}>
              {displaySections(split.rightOrder)}
            </Column>
          )}
          {split.unlisted.length > 0 && (
            <Column title={"Unlisted"}>
              {displaySections(split.unlisted)}
            </Column>
          )}
        </>
      )}
      {layout === "full" && (
        <>
          {full.order.length > 0 && (
            <Column title={"Content"}>{displaySections(full.order)}</Column>
          )}
          {full.unlisted.length > 0 && (
            <Column title={"Unlisted"}>{displaySections(full.unlisted)}</Column>
          )}
        </>
      )}
    </Wrapper>
  );
});

export default Editor;

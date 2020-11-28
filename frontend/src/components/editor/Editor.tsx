import React, { useContext, ReactElement } from "react";
import { observer } from "mobx-react-lite";
import styled from "styled-components";

import Experience from "./sections/Experience";
import Info from "./sections/Info";
import Skills from "./sections/Skills";
import Column from "./sections/parts/Column";
import Meta from "./sections/Meta";
import Catalogue from "./catalogue/Catalogue";
import { Content as FakeSection } from "./sections/parts/Section";

import { ResumeBubble } from "../../bubbles/ResumeBubble";
import { ResumeEditor } from "../../typings/Resume.typing";
import media from "../../styled/media";

const Wrapper = styled.section`
  flex: 65%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding-right: ${({ theme }) => theme.spaceBig + "px"};

  ${media.tablet`
    padding-right: 0;
  `};
  /* ${media.tablet`
    display: none;
  `} */
`;

const Placeholder = styled(FakeSection)`
  padding-top: ${({ theme }) => theme.space + "px"};
`;

const Editor = observer(({ meta }: ResumeEditor) => {
  const resumeBubble = useContext(ResumeBubble);
  const { resume } = resumeBubble;
  const { skills, experience, info } = resume;
  const { content } = meta;
  const { full, split } = content;
  const { layout } = meta.paper;

  const sections: { [key: string]: ReactElement | undefined } = {
    skills: skills ? <Skills key={"skills-editor"} /> : undefined,
    experience: experience ? (
      <Experience key={"experience-editor"} />
    ) : undefined,
  };

  const displaySections = (
    order: string[],
    placeholder: string = "Nothing listed..."
  ) =>
    order.length > 0 ? (
      order.map((member) => sections[member])
    ) : (
      <Placeholder style={{ color: meta.colors.main }}>
        {placeholder}
      </Placeholder>
    );

  const availablePicks = Object.keys(sections).filter((s) => !sections[s]);

  return (
    <Wrapper>
      {availablePicks.length > 0 && (
        <Catalogue availablePicks={availablePicks} />
      )}
      <Meta />
      <h1>Resume</h1>
      {info && <Info />}
      {layout === "split" && (
        <>
          <Column title={"Left column content"}>
            {displaySections(split.leftOrder)}
          </Column>
          <Column title={"Right column content"}>
            {displaySections(split.rightOrder)}
          </Column>
          {split.unlisted.length > 0 && (
            <Column title={"Unlisted content"}>
              {displaySections(split.unlisted, "No unlisted sections...")}
            </Column>
          )}
        </>
      )}
      {layout === "full" && (
        <>
          <Column title={"Content"}>{displaySections(full.order)}</Column>
          {full.unlisted.length > 0 && (
            <Column title={"Unlisted content"}>
              {displaySections(full.unlisted, "No unlisted sections...")}
            </Column>
          )}
        </>
      )}
    </Wrapper>
  );
});

export default Editor;

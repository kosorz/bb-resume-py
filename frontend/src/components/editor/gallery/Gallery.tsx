import React, { useContext } from "react";
import styled from "styled-components";

import Section from "../sections/parts/Section";
import Experience from "./picks/Experience";
import Skills from "./picks/Skills";
import { observer } from "mobx-react-lite";
import { ResumeBubble } from "../../../bubbles/ResumeBubble";
import { Title } from "../Editor";

const Wrapper = styled.section`
  display: flex;
  flex-wrap: wrap;
`;

const Gallery = observer(() => {
  const resumeBubble = useContext(ResumeBubble);
  const { resume } = resumeBubble;
  const { skills, experience } = resume;
  const allPicks = [
    !skills ? <Skills key={"skills-pick"} /> : undefined,
    !experience ? <Experience key={"experience-pick"} /> : undefined,
  ];

  const picks = allPicks.filter((p) => !!p);

  return picks.length > 0 ? (
    <>
      <Title>Settings</Title>
      <Section
        identifier={"gallery"}
        title={"Content gallery"}
        purpose={`There are many variations of passages of Lorem Ipsum available, but 
    the majority have suffered alteration in some form, by injected humour, 
    or randomised words which.`}
      >
        <Wrapper>{picks}</Wrapper>
      </Section>
    </>
  ) : null;
});

export default Gallery;

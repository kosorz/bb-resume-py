import React, { ReactNode } from "react";
import styled from "styled-components";

import Section from "../sections/parts/Section";
import Experience from "./picks/Experience";
import Skills from "./picks/Skills";

const Wrapper = styled.section`
  display: flex;
  flex-wrap: wrap;
`;

const Gallery = ({ availablePicks }: { availablePicks: string[] }) => {
  const picks: { [key: string]: ReactNode } = {
    skills: <Skills />,
    experience: <Experience />,
  };

  return (
    <Section
      identifier={"gallery"}
      title={"Content gallery"}
      purpose={`There are many variations of passages of Lorem Ipsum available, but 
    the majority have suffered alteration in some form, by injected humour, 
    or randomised words which.`}
    >
      <Wrapper>{availablePicks.map((p) => picks[p])}</Wrapper>
    </Section>
  );
};

export default Gallery;

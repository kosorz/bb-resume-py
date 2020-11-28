import React, { useContext, ReactNode } from "react";
import { observer } from "mobx-react-lite";
import styled from "styled-components";

import Section from "../sections/parts/Section";
import Experience from "./picks/Experience";
import Skills from "./picks/Skills";

import { ResumeBubble } from "../../../bubbles/ResumeBubble";

const Wrapper = styled.section`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const Catalogue = observer(
  ({ availablePicks }: { availablePicks: string[] }) => {
    const resumeBubble = useContext(ResumeBubble);
    const { activeSection } = resumeBubble;

    const picks: { [key: string]: ReactNode } = {
      experience: <Experience />,
      skills: <Skills />,
    };

    return (
      <Section
        key={`catalogue-${activeSection}`}
        identifier={"catalogue"}
        title={"Content catalogue"}
        purpose={`There are many variations of passages of Lorem Ipsum available, but 
    the majority have suffered alteration in some form, by injected humour, 
    or randomised words which.`}
      >
        <Wrapper>{availablePicks.map((p, i) => picks[p])}</Wrapper>
      </Section>
    );
  }
);

export default Catalogue;

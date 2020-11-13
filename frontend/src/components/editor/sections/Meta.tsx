import React, { useContext } from "react";
import { observer } from "mobx-react-lite";

import Section from "./parts/Section";

import { ResumeBubble } from "../../../bubbles/ResumeBubble";

const Meta = observer(() => {
  const resumeBubble = useContext(ResumeBubble);
  const { activeSection } = resumeBubble;
  return (
    <Section
      key={`meta-${activeSection}`}
      identifier={"meta"}
      title={"Appearance"}
      purpose={`There are many variations of passages of Lorem Ipsum available, but 
    the majority have suffered alteration in some form, by injected humour, 
    or randomised words which.`}
    >
      Lorem ipsum
    </Section>
  );
});

export default Meta;

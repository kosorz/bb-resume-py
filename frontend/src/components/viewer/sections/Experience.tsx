import React from "react";
import { View } from "@react-pdf/renderer";

import SectionHeadline from "./parts/SectionHeadline";
import ExperienceUnit from "./ExperienceUnit";

import { ExperienceViewer } from "../../../typings/Experience.typing";

const Experience = ({ title, units, theme }: ExperienceViewer) => {
  return (
    <View wrap={true}>
      <View wrap={false}>
        <SectionHeadline text={title} theme={theme} fallback={"experience"} />
        <ExperienceUnit key={`experience-unit-0`} {...units[0]} theme={theme} />
      </View>
      <View>
        {units.slice(1).map((u, i) => (
          <ExperienceUnit key={`experience-unit-${i}`} {...u} theme={theme} />
        ))}
      </View>
    </View>
  );
};

export default Experience;

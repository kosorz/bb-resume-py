import React from "react";
import { View } from "@react-pdf/renderer";

import SectionHeader from "./parts/SectionHeader";
import ExperienceUnit from "./ExperienceUnit";

import { ExperienceViewer } from "../../../typings/Experience.typing";

const Experience = ({ title, units, theme }: ExperienceViewer) => {
  return (
    <View wrap={true}>
      <SectionHeader text={title} theme={theme} />
      <View>
        {units
          .filter((u) => !u.deleted)
          .map((u, i) => (
            <ExperienceUnit key={`experience-unit-${i}`} {...u} theme={theme} />
          ))}
      </View>
    </View>
  );
};

export default Experience;

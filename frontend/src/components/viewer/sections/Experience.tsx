import React from "react";
import { View } from "@react-pdf/renderer";

import SectionHeadline from "./parts/SectionHeadline";
import ExperienceUnit from "./ExperienceUnit";

import { sortExperienceUnits } from "../../../util/fns";
import { ExperienceViewer } from "../../../typings/Experience.typing";

const Experience = ({ title, units, order, theme }: ExperienceViewer) => {
  const values = sortExperienceUnits(order, units);

  return (
    <View wrap={true}>
      <View wrap={false}>
        <SectionHeadline text={title} theme={theme} fallback={"experience"} />
        <ExperienceUnit theme={theme} {...values[0]} />
      </View>
      <View>
        {values.slice(1).map((u) => (
          <ExperienceUnit
            key={`experience-unit-${u.id}-viewer`}
            theme={theme}
            {...u}
          />
        ))}
      </View>
    </View>
  );
};

export default Experience;

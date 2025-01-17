import React from "react";
import { View } from "@react-pdf/renderer";

import SectionHeadline from "../components/SectionHeadline";
import ExperienceUnit from "./ExperienceUnit";

import { sortExperienceUnits } from "../../../../../util/fns";
import { ExperienceViewer } from "../../../editor/sections/Experience/Experience.typing";

const Experience = ({ title, units, order, meta }: ExperienceViewer) => {
  const values = sortExperienceUnits(order, units);

  return (
    <View wrap={true}>
      <View wrap={false}>
        <SectionHeadline text={title} meta={meta} fallback={"experience"} />
        <ExperienceUnit meta={meta} {...values[0]} />
      </View>
      <View>
        {values.slice(1).map((u) => (
          <ExperienceUnit
            key={`experience-unit-${u.id}-viewer`}
            meta={meta}
            {...u}
          />
        ))}
      </View>
    </View>
  );
};

export default Experience;

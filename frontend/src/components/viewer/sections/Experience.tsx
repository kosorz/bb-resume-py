import React from "react";
import { View, StyleSheet } from "@react-pdf/renderer";

import SectionHeadline from "./parts/SectionHeadline";
import ExperienceUnit from "./ExperienceUnit";

import { sortExperienceUnits } from "../../../util/fns";
import { ExperienceViewer } from "../../../typings/Experience.typing";

const Experience = ({
  title,
  units,
  order,
  meta,
  isActive,
}: ExperienceViewer) => {
  const values = sortExperienceUnits(order, units);

  const styles = StyleSheet.create({
    experience: {
      opacity: isActive ? 1 : 0.4,
    },
  });

  return (
    <View wrap={true} style={styles.experience}>
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

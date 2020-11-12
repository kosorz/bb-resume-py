import React from "react";
import { View, StyleSheet } from "@react-pdf/renderer";

import SectionHeadline from "./parts/SectionHeadline";
import SkillsGroup from "../../viewer/sections/SkillsGroup";

import { SkillsViewer } from "../../../typings/Skills.typing";
import { sortSkillsGroups } from "../../../util/fns";

const Skills = ({ title, groups, order, meta, isActive }: SkillsViewer) => {
  const values = sortSkillsGroups(order, groups);

  const styles = StyleSheet.create({
    skills: { opacity: isActive ? 1 : 0.2 },
  });

  return (
    <View wrap={true} style={styles.skills}>
      <View wrap={false}>
        <SectionHeadline text={title} meta={meta} fallback={"skills"} />
        <SkillsGroup meta={meta} {...values[0]} />
      </View>
      <View>
        {values.slice(1).map((g) => (
          <SkillsGroup key={`skill-group-${g.id}-viewer`} meta={meta} {...g} />
        ))}
      </View>
    </View>
  );
};

export default Skills;

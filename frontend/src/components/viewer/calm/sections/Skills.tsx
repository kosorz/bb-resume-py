import React from "react";
import { View } from "@react-pdf/renderer";

import SectionHeadline from "./parts/SectionHeadline";

import { sortSkillsGroups } from "../../../../util/fns";
import { SkillsViewer } from "../../../../typings/Skills.typing";
import SkillsGroup from "./SkillsGroup";

const Skills = ({ title, groups, order, meta }: SkillsViewer) => {
  const values = sortSkillsGroups(order, groups);

  return (
    <View wrap={true}>
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

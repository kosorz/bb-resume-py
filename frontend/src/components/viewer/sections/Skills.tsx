import React from "react";
import { View } from "@react-pdf/renderer";

import SectionHeadline from "./parts/SectionHeadline";
import SkillsGroup from "../../viewer/sections/SkillsGroup";

import { SkillsViewer } from "../../../typings/Skills.typing";
import { sortSkillsGroups } from "../../../util/fns";

const Skills = ({ title, groups, order, theme }: SkillsViewer) => {
  const values = sortSkillsGroups(order, groups);

  return (
    <View wrap={true}>
      <View wrap={false}>
        <SectionHeadline text={title} theme={theme} fallback={"skills"} />
        <SkillsGroup theme={theme} {...values[0]} />
      </View>
      <View>
        {values.slice(1).map((g) => (
          <SkillsGroup
            key={`skill-group-${g.id}-viewer`}
            theme={theme}
            {...g}
          />
        ))}
      </View>
    </View>
  );
};

export default Skills;

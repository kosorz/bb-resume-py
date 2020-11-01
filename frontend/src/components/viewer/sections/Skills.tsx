import React from "react";
import { View } from "@react-pdf/renderer";

import SectionHeadline from "./parts/SectionHeadline";
import SkillsGroup from "../../viewer/sections/SkillsGroup";

import { SkillsViewer } from "../../../typings/Skills.typing";

const Skills = ({ title, groups, theme }: SkillsViewer) => {
  return (
    <View wrap={true}>
      <View wrap={false}>
        <SectionHeadline text={title} theme={theme} fallback={"skills"} />
        <SkillsGroup key={`skill-group-0`} {...groups[0]} theme={theme} />
      </View>
      <View>
        {groups.slice(1).map((g, i) => (
          <SkillsGroup key={`skill-group-${i}`} {...g} theme={theme} />
        ))}
      </View>
    </View>
  );
};

export default Skills;

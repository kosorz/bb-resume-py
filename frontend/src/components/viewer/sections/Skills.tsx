import React from "react";
import { View } from "@react-pdf/renderer";

import SectionHeadline from "./parts/SectionHeadline";
import SkillsGroup from "../../viewer/sections/SkillsGroup";

import { SkillsViewer } from "../../../typings/Skills.typing";

const Skills = ({ title, groups, theme }: SkillsViewer) => {
  return (
    <View wrap={true}>
      <SectionHeadline text={title} theme={theme} fallback={"skills"} />
      <View>
        {groups
          .filter((g) => !g.deleted)
          .map((g, i) => (
            <SkillsGroup key={`experience-unit-${i}`} {...g} theme={theme} />
          ))}
      </View>
    </View>
  );
};

export default Skills;

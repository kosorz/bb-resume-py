import React from "react";
import { View } from "@react-pdf/renderer";

import SectionHeadline from "./parts/SectionHeadline";
import SkillsGroup from "../../viewer/sections/SkillsGroup";

import { SkillsViewer } from "../../../typings/Skills.typing";
import { sortToOrder } from "../../../util/fns";

const Skills = ({ title, groups, order, theme }: SkillsViewer) => {
  const values = sortToOrder(order, groups);

  return (
    <View wrap={true}>
      <View wrap={false}>
        <SectionHeadline text={title} theme={theme} fallback={"skills"} />
        <SkillsGroup key={`skill-group-0`} {...values[0]} theme={theme} />
      </View>
      <View>
        {values.slice(1).map((g, i) => (
          <SkillsGroup
            key={`skill-group-${g.id}-viewer`}
            {...g}
            theme={theme}
          />
        ))}
      </View>
    </View>
  );
};

export default Skills;

import React from "react";
import { View, StyleSheet } from "@react-pdf/renderer";

import Point from "../components/Point";
import SubSectionHeadline from "../components/SubSectionHeadline";

import { SkillsGroupViewer } from "../../../editor/sections/Skills/SkillsGroup.typing";

const SkillsGroup = ({ meta, title, values }: SkillsGroupViewer) => {
  const { paper, fontSize } = meta;

  const styles = StyleSheet.create({
    skillsGroup: {
      marginBottom: paper.space / 3,
      fontSize: fontSize.small,
    },
  });

  return (
    <View style={styles.skillsGroup} wrap={false}>
      <SubSectionHeadline text={title} fallback={"Title"} meta={meta} />
      {values.filter((el) => el !== "").length ? (
        values.map((v, i) => (
          <Point key={`skill-group-${i}-values`}>{v.trim()}</Point>
        ))
      ) : (
        <Point>Lorem ipsum</Point>
      )}
    </View>
  );
};

export default SkillsGroup;

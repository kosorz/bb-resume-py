import React from "react";
import { View, StyleSheet } from "@react-pdf/renderer";

import Point from "./parts/Point";
import SubSectionHeadline from "./parts/SubSectionHeadline";

import { SkillsGroupViewer } from "../../../../typings/SkillsGroup.typing";

const SkillsGroup = ({ meta, title, values }: SkillsGroupViewer) => {
  const { paper, fontSize } = meta;

  const styles = StyleSheet.create({
    skillsGroup: {
      marginBottom: paper.space / 10,
      fontSize: fontSize.small,
    },
  });

  return (
    <View style={styles.skillsGroup} wrap={false}>
      <SubSectionHeadline text={title} fallback={"Title"} meta={meta} />
      {values.length ? (
        values.map((v, i) => <Point key={`skill-group-${i}-values`}>{v}</Point>)
      ) : (
        <Point>Lorem ipsum</Point>
      )}
    </View>
  );
};

export default SkillsGroup;

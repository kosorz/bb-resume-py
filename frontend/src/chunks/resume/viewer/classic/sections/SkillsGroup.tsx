import React from "react";
import { View, StyleSheet, Text } from "@react-pdf/renderer";

import { SkillsGroupViewer } from "../../../editor/sections/Skills/SkillsGroup.typing";
import SubSectionHeadline from "../components/SubSectionHeadline";

const SkillsGroup = ({ meta, title, values }: SkillsGroupViewer) => {
  const { paper, fontSize } = meta;

  const styles = StyleSheet.create({
    skillsGroup: {
      marginBottom: paper.space / 4,
    },
    values: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
    },
    value: {
      borderBottom: 1,
      marginTop: paper.space / 10,
      marginRight: paper.space / 10,
      fontSize: fontSize.small,
    },
  });

  return (
    <View style={styles.skillsGroup} wrap={false}>
      <SubSectionHeadline text={title} fallback={"Title"} meta={meta} />
      <View style={styles.values}>
        {values.length ? (
          values.map((v, i) => (
            <Text key={`skill-group-${i}-values`} style={styles.value}>
              {v}
            </Text>
          ))
        ) : (
          <Text style={styles.value}>Lorem ipsum</Text>
        )}
      </View>
    </View>
  );
};

export default SkillsGroup;

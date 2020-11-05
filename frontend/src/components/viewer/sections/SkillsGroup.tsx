import React from "react";
import { View, StyleSheet, Text } from "@react-pdf/renderer";

import { SkillsGroupViewer } from "../../../typings/SkillsGroup.typing";
import SubSectionHeadline from "./parts/SubSectionHeadline";

const SkillsGroup = ({ theme, title, values }: SkillsGroupViewer) => {
  const styles = StyleSheet.create({
    skillsGroup: {
      marginBottom: theme.paper.space / 4,
    },
    values: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
    },
    value: {
      borderBottom: 1,
      marginTop: theme.paper.space / 10,
      marginRight: theme.paper.space / 10,
      fontSize: theme.fontSize.small,
    },
  });

  return (
    <View style={styles.skillsGroup} wrap={false}>
      <SubSectionHeadline text={title} fallback={"Title"} theme={theme} />
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

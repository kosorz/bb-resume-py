import React from "react";
import { Text, StyleSheet } from "@react-pdf/renderer";

import { SectionHeadlineViewer } from "../../../../typings/SectionHeadline.typing";

const SubSectionHeadline = ({
  text,
  fallback,
  theme,
}: SectionHeadlineViewer) => {
  const styles = StyleSheet.create({
    text: {
      fontFamily: theme.fontFamily.medium,
      fontSize: theme.fontSize.medium,
      marginBottom: theme.paper.space / 15,
    },
  });

  return <Text style={styles.text}>{text || fallback}</Text>;
};

export default SubSectionHeadline;

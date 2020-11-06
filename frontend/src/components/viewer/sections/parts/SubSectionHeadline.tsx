import React from "react";
import { Text, StyleSheet } from "@react-pdf/renderer";

import ResumeThemeShape from "../../../../typings/ResumeTheme.typing";

const SubSectionHeadline = ({
  text,
  fallback,
  theme,
}: {
  theme: ResumeThemeShape;
  text: string;
  fallback: string;
}) => {
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

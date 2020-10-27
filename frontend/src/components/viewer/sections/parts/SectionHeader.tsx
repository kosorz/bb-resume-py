import React from "react";
import { Text, StyleSheet } from "@react-pdf/renderer";

import { SectionHeaderViewer } from "../../../../typings/SectionHeader.typing";

const SectionHeader = ({ text, theme }: SectionHeaderViewer) => {
  const styles = StyleSheet.create({
    text: {
      fontSize: theme.fontSize.large,
      fontFamily: theme.fontFamily.bold,
      flex: 100,
      borderBottom: 2,
      marginBottom: theme.paper.space / 4,
    },
  });

  return (
    <Text style={styles.text}>{(text || "experience").toUpperCase()}</Text>
  );
};

export default SectionHeader;

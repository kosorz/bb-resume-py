import React from "react";
import { Text, StyleSheet } from "@react-pdf/renderer";

import { SectionHeadlineViewer } from "../../../../typings/SectionHeadline.typing";

const SectionHeadline = ({ text, fallback, theme }: SectionHeadlineViewer) => {
  const styles = StyleSheet.create({
    text: {
      fontSize: theme.fontSize.large,
      fontFamily: theme.fontFamily.bold,
      flex: 100,
      borderBottom: 2,
      marginBottom: theme.paper.space / 4,
    },
  });

  return <Text style={styles.text}>{(text || fallback).toUpperCase()}</Text>;
};

export default SectionHeadline;

import React from "react";
import { Text, StyleSheet } from "@react-pdf/renderer";
import ResumeThemeShape from "../../../../typings/ResumeTheme.typing";

const SectionHeadline = ({
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
      fontSize: theme.fontSize.large,
      fontFamily: theme.fontFamily.bold,
      borderBottom: 2,
      marginBottom: theme.paper.space / 4,
    },
  });

  return <Text style={styles.text}>{(text || fallback).toUpperCase()}</Text>;
};

export default SectionHeadline;

import React from "react";
import { Text, StyleSheet } from "@react-pdf/renderer";

import MetaShape from "../../../../typings/Meta.typing";

const SectionHeadline = ({
  text,
  fallback,
  meta,
}: {
  meta: MetaShape;
  text: string;
  fallback: string;
}) => {
  const { fontSize, fontFamily, paper } = meta;

  const styles = StyleSheet.create({
    text: {
      fontSize: fontSize.large,
      fontFamily: fontFamily.bold,
      borderBottom: 2,
      marginBottom: paper.space / 4,
    },
  });

  return <Text style={styles.text}>{(text || fallback).toUpperCase()}</Text>;
};

export default SectionHeadline;

import React from "react";
import { Text, StyleSheet } from "@react-pdf/renderer";
import MetaShape from "../../../editor/sections/Meta/Meta.typing";

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
      fontSize: fontSize.large * 0.7,
      marginBottom: paper.space / 5,
      fontFamily: fontFamily + "-Bold",
      letterSpacing: 2.5,
      textTransform: "uppercase",
    },
  });

  return <Text style={styles.text}>{text || fallback}</Text>;
};

export default SectionHeadline;

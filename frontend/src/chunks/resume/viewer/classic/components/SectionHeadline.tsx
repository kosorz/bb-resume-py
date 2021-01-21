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
      fontSize: fontSize.large,
      fontFamily: fontFamily + "-Bold",
      paddingRight: paper.layout === "split" ? 0 : paper.space / 4,
      borderBottom: 2,
      marginBottom: paper.space / 4,
      textTransform: "uppercase",
    },
  });

  return <Text style={styles.text}>{text || fallback}</Text>;
};

export default SectionHeadline;

import React from "react";
import { Text, StyleSheet } from "@react-pdf/renderer";

import MetaShape from "../../../editor/sections/Meta/Meta.typing";

const SubSectionHeadline = ({
  text,
  fallback,
  meta,
}: {
  meta: MetaShape;
  text: string;
  fallback: string;
}) => {
  const { fontFamily, fontSize, paper } = meta;

  const styles = StyleSheet.create({
    text: {
      fontFamily: fontFamily + "-Regular",
      fontSize: fontSize.medium,
      marginBottom: paper.space / 15,
    },
  });

  return <Text style={styles.text}>{text || fallback}</Text>;
};

export default SubSectionHeadline;

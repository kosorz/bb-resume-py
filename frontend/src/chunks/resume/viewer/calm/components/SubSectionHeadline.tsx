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
  const { paper, fontFamily, fontSize } = meta;

  const styles = StyleSheet.create({
    text: {
      marginBottom: paper.space / 10,
      fontFamily: fontFamily + "-Bold",
      fontSize: fontSize.main,
    },
  });

  return <Text style={styles.text}>{text || fallback}</Text>;
};

export default SubSectionHeadline;

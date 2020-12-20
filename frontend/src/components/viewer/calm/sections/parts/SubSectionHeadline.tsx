import React from "react";
import { Text, StyleSheet } from "@react-pdf/renderer";

import MetaShape from "../../../../../typings/Meta.typing";

const SubSectionHeadline = ({
  text,
  fallback,
  meta,
}: {
  meta: MetaShape;
  text: string;
  fallback: string;
}) => {
  const { paper, fontFamily } = meta;

  const styles = StyleSheet.create({
    text: { marginBottom: paper.space / 10, fontFamily: fontFamily + "-Bold" },
  });

  return <Text style={styles.text}>{text || fallback}</Text>;
};

export default SubSectionHeadline;

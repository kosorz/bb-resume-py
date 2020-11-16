import React from "react";
import { Text, StyleSheet, View } from "@react-pdf/renderer";

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
    headline: {
      width: "100%",
      display: "flex",
      flexDirection: paper.layout === "split" ? "column" : "row",
    },
    text: {
      fontSize: fontSize.large,
      fontFamily: fontFamily + "-Bold",
      paddingRight: paper.layout === "split" ? 0 : paper.space / 4,
      borderBottom: 2,
      marginBottom: paper.space / 4,
    },
  });

  return (
    <View style={styles.headline}>
      <Text style={styles.text}>{(text || fallback).toUpperCase()}</Text>
    </View>
  );
};

export default SectionHeadline;

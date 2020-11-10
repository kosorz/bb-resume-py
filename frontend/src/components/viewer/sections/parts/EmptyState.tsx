import React from "react";
import { View, StyleSheet, Text } from "@react-pdf/renderer";

import MetaShape from "../../../../typings/Meta.typing";

const EmptyState = ({
  title,
  text,
  meta,
}: {
  title: string;
  meta: MetaShape;
  text: string;
}) => {
  const { colors, fontSize, paper } = meta;
  const styles = StyleSheet.create({
    placeholder: {
      width: 200,
      textAlign: "center",
      marginTop: paper.space,
      marginHorizontal: "auto",
      color: colors.secondary,
    },
    placeholderTitle: {
      color: colors.main,
      marginBottom: paper.space / 4,
      fontSize: fontSize.large,
    },
  });
  return (
    <View style={styles.placeholder}>
      <Text style={styles.placeholderTitle}>{title}</Text>
      <Text>{text}</Text>
    </View>
  );
};

export default EmptyState;
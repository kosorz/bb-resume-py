import React, { ReactElement } from "react";
import { View, StyleSheet } from "@react-pdf/renderer";

import MetaShape from "../../../../../typings/Meta.typing";

const TwoColumns = ({
  children,
  meta,
}: {
  children: (ReactElement | undefined)[];
  meta: MetaShape;
}) => {
  const { paper, fontSize, fontFamily } = meta;

  const styles = StyleSheet.create({
    column: {
      marginHorizontal: paper.space,
      fontSize: fontSize.main,
      fontFamily: fontFamily + "-Regular",
    },
  });
  return (
    <View style={styles.column}>
      {children.map((ch, i) => {
        if (!ch) return null;

        return <View key={`column-child-${i}`}>{ch}</View>;
      })}
    </View>
  );
};

export default TwoColumns;

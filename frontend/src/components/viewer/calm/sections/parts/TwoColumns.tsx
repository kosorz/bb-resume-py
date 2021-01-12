import React, { ReactElement } from "react";
import { View, StyleSheet } from "@react-pdf/renderer";

import MetaShape from "../../../../../typings/Meta.typing";

const TwoColumns = ({
  leftChildren,
  rightChildren,
  meta,
}: {
  meta: MetaShape;
  leftChildren: (ReactElement | undefined)[];
  rightChildren: (ReactElement | undefined)[];
}) => {
  const { paper, fontSize } = meta;

  const styles = StyleSheet.create({
    twoColumn: {
      marginTop: 0.3 * paper.space,
      marginHorizontal: 0.6 * paper.space,
      fontSize: fontSize.main,
      display: "flex",
      flexDirection: "row",
    },
    leftColumn: {
      width: 208 - 0.6 * paper.space,
      paddingRight: 0.4 * paper.space,
    },
    rightColumn: {
      paddingLeft: 0.4 * paper.space,
      width: 346,
    },
  });

  const renderWithKeys = (
    chs: (ReactElement | undefined)[],
    column: string
  ) => {
    return chs.map((ch, i) => {
      if (!ch) return null;

      return <View key={`${column}-child-${i}`}>{ch}</View>;
    });
  };

  return (
    <View style={styles.twoColumn}>
      <View style={styles.leftColumn}>
        {renderWithKeys(leftChildren, "left")}
      </View>
      <View style={styles.rightColumn}>
        {renderWithKeys(rightChildren, "right")}
      </View>
    </View>
  );
};

export default TwoColumns;

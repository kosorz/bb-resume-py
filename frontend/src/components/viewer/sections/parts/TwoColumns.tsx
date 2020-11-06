import React, { ReactElement } from "react";
import { View, StyleSheet } from "@react-pdf/renderer";

import MetaShape from "../../../../typings/Meta.typing";

const TwoColumns = ({
  leftChildren,
  rightChildren,
  meta,
}: {
  meta: MetaShape;
  leftChildren: (ReactElement | undefined)[];
  rightChildren: (ReactElement | undefined)[];
}) => {
  const { paper, fontSize, fontFamily } = meta;

  const styles = StyleSheet.create({
    twoColumn: {
      marginHorizontal: paper.space,
      fontSize: fontSize.main,
      fontFamily: fontFamily.normal,
      display: "flex",
      flexDirection: "row",
    },
    leftColumn: {
      width: 595 - 200 - 2 * paper.space,
    },
    rightColumn: {
      width: 200,
      paddingLeft: paper.space / 2,
    },
  });

  const renderWithKeys = (chs: (ReactElement | undefined)[], side: string) => {
    return chs.map((ch, i) => {
      if (!ch) return null;

      return <View key={`${side}-child-${i}`}>{ch}</View>;
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

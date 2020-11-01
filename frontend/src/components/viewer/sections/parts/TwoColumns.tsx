import React, { ReactElement } from "react";
import { View, StyleSheet } from "@react-pdf/renderer";

import { TwoColumnViewer } from "../../../../typings/TwoColumn.typing";

const TwoColumns = ({
  leftChildren,
  rightChildren,
  theme,
}: TwoColumnViewer) => {
  const styles = StyleSheet.create({
    twoColumn: {
      marginHorizontal: theme.paper.space,
      fontSize: theme.fontSize.main,
      fontFamily: theme.fontFamily.normal,
      display: "flex",
      flexDirection: "row",
    },
    leftColumn: {
      width: 595 - 200 - 2 * theme.paper.space,
    },
    rightColumn: {
      width: 200,
      paddingLeft: theme.paper.space / 2,
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

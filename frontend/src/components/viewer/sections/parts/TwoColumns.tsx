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
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      marginHorizontal: theme.paper.space,
      fontSize: theme.fontSize.main,
      fontFamily: theme.fontFamily.normal,
    },
    leftColumn: {
      flex: 60,
      display: "flex",
    },
    rightColumn: {
      flex: 40,
      display: "flex",
      paddingLeft: theme.paper.space / 2,
    },
  });

  const renderWithKeys = (chs: (ReactElement | undefined)[], side: string) => {
    return chs.map((ch, i) => {
      if (!ch) return null;

      return <React.Fragment key={`${side}-child-${i}`}>{ch}</React.Fragment>;
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

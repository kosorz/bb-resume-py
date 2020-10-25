import React from "react";
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
      marginLeft: theme.paper.space / 2,
      display: "flex",
    },
  });

  return (
    <View style={styles.twoColumn}>
      <View style={styles.leftColumn}>{leftChildren}</View>
      <View style={styles.rightColumn}>{rightChildren}</View>
    </View>
  );
};

export default TwoColumns;

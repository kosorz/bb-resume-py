import React, { ReactElement } from "react";
import { View, StyleSheet } from "@react-pdf/renderer";

import EmptyState from "./EmptyState";

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
      fontFamily: fontFamily + "-Regular",
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
        {leftChildren.length > 0 ? (
          renderWithKeys(leftChildren, "left")
        ) : (
          <EmptyState
            meta={meta}
            title={"Empty"}
            text={"Use editor to list sections in left column"}
          />
        )}
      </View>
      <View style={styles.rightColumn}>
        {rightChildren.length > 0 ? (
          renderWithKeys(rightChildren, "right")
        ) : (
          <EmptyState
            meta={meta}
            title={"Empty"}
            text={"Use editor to list sections in right column"}
          />
        )}
      </View>
    </View>
  );
};

export default TwoColumns;

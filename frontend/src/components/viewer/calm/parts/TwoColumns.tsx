import React, { ReactElement } from "react";
import { View, StyleSheet } from "@react-pdf/renderer";

import MetaShape from "../../../../typings/Meta.typing";
import EmptyState from "../../classic/sections/parts/EmptyState";

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
      paddingRight: paper.space / 5,
    },
    rightColumn: {
      paddingLeft: paper.space / 5,
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
        {leftChildren.length > 0 ? (
          renderWithKeys(leftChildren, "left")
        ) : (
          <EmptyState
            headlineColor={meta.colors.secondary}
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
            headlineColor={meta.colors.secondary}
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

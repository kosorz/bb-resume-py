import React, { ReactElement } from "react";
import { View, StyleSheet } from "@react-pdf/renderer";

import MetaShape from "../../../../../typings/Meta.typing";
import EmptyState from "./EmptyState";

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
      {children.length > 0 ? (
        children.map((ch, i) => {
          if (!ch) return null;

          return <View key={`column-child-${i}`}>{ch}</View>;
        })
      ) : (
        <EmptyState
          meta={meta}
          title={"Empty"}
          text={"Use editor to list sections in your resume"}
        />
      )}
    </View>
  );
};

export default TwoColumns;
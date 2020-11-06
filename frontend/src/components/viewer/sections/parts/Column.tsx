import React, { ReactNode } from "react";
import { View, StyleSheet } from "@react-pdf/renderer";

import MetaShape from "../../../../typings/Meta.typing";

const TwoColumns = ({
  children,
  meta,
}: {
  meta: MetaShape;
  children: ReactNode | ReactNode[];
}) => {
  const { paper, fontSize, fontFamily } = meta;

  const styles = StyleSheet.create({
    column: {
      marginHorizontal: paper.space,
      fontSize: fontSize.main,
      fontFamily: fontFamily + "-Regular",
    },
  });
  return <View style={styles.column}>{children}</View>;
};

export default TwoColumns;

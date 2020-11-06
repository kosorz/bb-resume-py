import React, { ReactNode } from "react";
import { View, StyleSheet } from "@react-pdf/renderer";

import ResumeThemeShape from "../../../../typings/ResumeTheme.typing";

const TwoColumns = ({
  children,
  theme,
}: {
  theme: ResumeThemeShape;
  children: ReactNode | ReactNode[];
}) => {
  const styles = StyleSheet.create({
    column: {
      marginHorizontal: theme.paper.space,
      fontSize: theme.fontSize.main,
      fontFamily: theme.fontFamily.normal,
    },
  });

  return <View style={styles.column}>{children}</View>;
};

export default TwoColumns;

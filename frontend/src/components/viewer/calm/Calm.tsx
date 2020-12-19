import React from "react";
import { StyleSheet, Page, View } from "@react-pdf/renderer";

import { ResumeViewer } from "../../../typings/Resume.typing";
import Info from "./sections/Info";

const Calm = ({ data, meta }: ResumeViewer) => {
  const { info } = data;
  const { fontSize, fontFamily, colors } = meta;

  const styles = StyleSheet.create({
    page: {
      backgroundColor: "#e7e5e8",
      fontFamily: fontFamily + "-Regular",
      fontSize: fontSize.small,
      color: colors.secondary,
    },
    decor: {
      width: "35%",
      position: "absolute",
      height: "100%",
      backgroundColor: "#CDCCCA",
    },
  });

  return (
    <Page size="A4" style={styles.page}>
      <View style={styles.decor} />
      {info && <Info meta={meta} {...info} />}
    </Page>
  );
};

export default Calm;

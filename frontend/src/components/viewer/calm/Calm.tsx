import React, { ReactElement } from "react";
import { StyleSheet, Page, View, Text } from "@react-pdf/renderer";

import { ResumeViewer } from "../../../typings/Resume.typing";
import Info from "./sections/Info";
import TwoColumns from "./parts/TwoColumns";

const Calm = ({ data, meta }: ResumeViewer) => {
  const { info } = data;
  const { fontSize, fontFamily, colors, content, paper } = meta;
  const { split } = content;
  const { mainOrder, secondaryOrder } = split;

  const styles = StyleSheet.create({
    page: {
      backgroundColor: "#e7e5e8",
      fontFamily: fontFamily + "-Regular",
      fontSize: fontSize.small,
      color: colors.secondary,
      paddingTop: 1.2 * paper.space,
      paddingBottom: 0.6 * paper.space,
    },
    decor: {
      width: "35%",
      position: "absolute",
      height: "150%",
      backgroundColor: "#CDCCCA",
    },
  });

  const sections: { [key: string]: ReactElement | undefined } = {
    skills: <Text>skills</Text>,
    experience: <Text>experience</Text>,
  };

  return (
    <Page size="A4" style={styles.page}>
      <View style={styles.decor} fixed={true} />
      {info && <Info meta={meta} {...info} />}
      <TwoColumns
        meta={meta}
        leftChildren={mainOrder.map((member) => sections[member])}
        rightChildren={secondaryOrder.map((member) => sections[member])}
      />
    </Page>
  );
};

export default Calm;

import React, { ReactElement } from "react";
import { StyleSheet, Page, Image } from "@react-pdf/renderer";

import Info from "./sections/Info";
import Skills from "./sections/Skills";
import Experience from "./sections/Experience";
import TwoColumns from "./components/TwoColumns";
import Column from "./components/Column";

import { ResumeViewer } from "../../Resume.typing";

const Classic = ({ data }: ResumeViewer) => {
  const { skills, experience, info, meta } = data;
  const { fontSize, paper, content, fontFamily, colors, background } = meta;
  const { split, full } = content;
  const { mainOrder, secondaryOrder } = split;
  const { order } = full;
  const { layout } = paper;

  const styles = StyleSheet.create({
    page: {
      backgroundColor: "#fff",
      fontFamily: fontFamily + "-Regular",
      fontSize: fontSize.small,
      paddingVertical: paper.space / 2,
      color: colors.secondary,
    },
    pageBackground: {
      position: "absolute",
      minWidth: "100%",
      minHeight: "100%",
      height: "100%",
      width: "100%",
    },
  });

  const sections: { [key: string]: ReactElement | undefined } = {
    skills: skills ? (
      <Skills meta={meta} key={"skills-viewer"} {...skills} />
    ) : undefined,
    experience: experience ? (
      <Experience meta={meta} key={"experience-viewer"} {...experience} />
    ) : undefined,
  };

  return (
    <Page size="A4" style={styles.page}>
      <Image
        fixed
        style={styles.pageBackground}
        source={`/backgrounds/${background}.png`}
      />
      {info && <Info meta={meta} {...info} />}
      {layout === "split" && (
        <TwoColumns
          meta={meta}
          leftChildren={mainOrder.map((member) => sections[member])}
          rightChildren={secondaryOrder.map((member) => sections[member])}
        />
      )}
      {layout === "full" && (
        <Column
          meta={meta}
          children={order.map((member) => sections[member])}
        />
      )}
    </Page>
  );
};

export default Classic;

import React, { ReactElement } from "react";
import { StyleSheet, Document, Page } from "@react-pdf/renderer";

import Info from "./sections/Info";
import Skills from "./sections/Skills";
import Experience from "./sections/Experience";
import TwoColumns from "./sections/parts/TwoColumns";
import Column from "./sections/parts/Column";

import { ResumeViewer } from "../../typings/Resume.typing";

const Resume = ({ data }: ResumeViewer) => {
  const { skills, experience, info, meta } = data;
  const { fontSize, paper, content, fontFamily } = meta;
  const { split, full } = content;
  const { leftOrder, rightOrder } = split;
  const { layout } = paper;

  const styles = StyleSheet.create({
    page: {
      backgroundColor: "#fff",
      fontFamily: fontFamily + "-Bold",
      fontSize: fontSize.small,
      paddingVertical: paper.space / 2,
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
    <Document>
      <Page size="A4" style={styles.page}>
        {info && <Info meta={meta} {...info} />}
        {layout === "split" && (
          <TwoColumns
            meta={meta}
            leftChildren={leftOrder.map((member) => sections[member])}
            rightChildren={rightOrder.map((member) => sections[member])}
          />
        )}
        {layout === "full" && (
          <Column
            meta={meta}
            children={full.order.map((member) => sections[member])}
          />
        )}
      </Page>
    </Document>
  );
};

//@ts-ignore
export default <Resume />;

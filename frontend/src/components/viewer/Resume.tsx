import React, { ReactElement } from "react";
import { StyleSheet, Document, Page } from "@react-pdf/renderer";

import Info from "./sections/Info";
import Skills from "./sections/Skills";
import Experience from "./sections/Experience";
import TwoColumns from "./sections/parts/TwoColumns";
import Column from "../viewer/sections/parts/Column";

import { ResumeViewer } from "../../typings/Resume.typing";

const Resume = ({ data }: ResumeViewer) => {
  const { skills, experience, info, meta } = data;
  const { leftColumn, rightColumn, fontFamily, fontSize, paper } = meta;

  const styles = StyleSheet.create({
    page: {
      backgroundColor: "#fff",
      fontFamily: fontFamily.bold,
      fontSize: fontSize.small,
      paddingVertical: paper.space / 2,
    },
  });

  const sections: { [key: string]: ReactElement | undefined } = {
    skills:
      skills && !skills.unlisted ? (
        <Skills meta={meta} {...skills} />
      ) : undefined,
    experience:
      experience && !experience.unlisted ? (
        <Experience meta={meta} {...experience} />
      ) : undefined,
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {info && <Info meta={meta} {...info} />}
        {rightColumn.length > 0 ? (
          <TwoColumns
            meta={meta}
            leftChildren={leftColumn.map((member) => sections[member])}
            rightChildren={rightColumn.map((member) => sections[member])}
          />
        ) : (
          <Column meta={meta}>
            {leftColumn.map((member) => sections[member])}
          </Column>
        )}
      </Page>
    </Document>
  );
};

//@ts-ignore
export default <Resume />;

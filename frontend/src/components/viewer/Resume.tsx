import React, { ReactElement } from "react";
import { StyleSheet, Document, Page } from "@react-pdf/renderer";

import Info from "./sections/Info";
import Skills from "./sections/Skills";
import Experience from "./sections/Experience";
import TwoColumns from "./sections/parts/TwoColumns";
import Column from "../viewer/sections/parts/Column";

import { ResumeViewer } from "../../typings/Resume.typing";

const Resume = ({ data, theme }: ResumeViewer) => {
  const styles = StyleSheet.create({
    page: {
      backgroundColor: "#fff",
      fontFamily: theme.fontFamily.bold,
      fontSize: theme.fontSize.small,
      paddingVertical: theme.paper.space / 2,
    },
  });

  const { skills, experience, info, leftColumn, rightColumn } = data;

  const sections: { [key: string]: ReactElement | undefined } = {
    skills:
      skills && !skills.unlisted ? (
        <Skills {...skills} theme={theme} />
      ) : undefined,
    experience:
      experience && !experience.unlisted ? (
        <Experience theme={theme} {...experience} />
      ) : undefined,
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {info && <Info {...info} theme={theme} />}
        {rightColumn.length > 0 ? (
          <TwoColumns
            leftChildren={leftColumn.map((member) => sections[member])}
            rightChildren={rightColumn.map((member) => sections[member])}
            theme={theme}
          />
        ) : (
          <Column theme={theme}>
            {leftColumn.map((member) => sections[member])}
          </Column>
        )}
      </Page>
    </Document>
  );
};

//@ts-ignore
export default <Resume />;

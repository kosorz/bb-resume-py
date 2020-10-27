import React from "react";
import { StyleSheet, Document, Page } from "@react-pdf/renderer";

import Info from "./sections/Info";
import Experience from "./sections/Experience";
import TwoColumns from "./sections/parts/TwoColumns";

import { ResumeViewer } from "../../typings/Resume.typing";

const Resume = ({ data, theme }: ResumeViewer) => {
  const styles = StyleSheet.create({
    page: {
      backgroundColor: "#fff",
      fontFamily: theme.fontFamily.bold,
      fontSize: theme.fontSize.small,
    },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {data.info && <Info {...data.info} theme={theme} />}
        <TwoColumns
          leftChildren={[
            data.experience && (
              <Experience theme={theme} {...data.experience} />
            ),
          ]}
          rightChildren={[]}
          theme={theme}
        />
      </Page>
    </Document>
  );
};

//@ts-ignore
export default <Resume />;

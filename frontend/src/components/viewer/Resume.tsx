import React from "react";
import { StyleSheet, Document, Page } from "@react-pdf/renderer";
import { ResumeViewer } from "../../typings/Resume.typing";
import Info from "./sections/Info";

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
      </Page>
    </Document>
  );
};

//@ts-ignore
export default <Resume />;

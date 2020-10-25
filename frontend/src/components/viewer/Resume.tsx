import React from "react";
import { StyleSheet, Document, Page } from "@react-pdf/renderer";
import { ResumeViewer } from "../../typings/Resume.typing";
import Info from "./sections/Info";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#fff",
  },
});

const Resume = ({ data }: ResumeViewer) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Info {...data.info} />
      </Page>
    </Document>
  );
};

//@ts-ignore
export default <Resume />;

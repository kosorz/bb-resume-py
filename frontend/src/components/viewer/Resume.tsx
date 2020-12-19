import React from "react";
import { Document } from "@react-pdf/renderer";
import { ResumeViewer } from "../../typings/Resume.typing";
import Calm from "./calm/Calm";
import Classic from "./classic/Classic";

const Resume = ({ data, meta }: ResumeViewer) => {
  return (
    <Document>
      <Calm data={data} meta={meta} />
    </Document>
  );
};

//@ts-ignore
export default <Resume />;

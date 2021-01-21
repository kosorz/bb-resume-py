import React, { ReactNode } from "react";
import { Document } from "@react-pdf/renderer";
import { ResumeViewer } from "../Resume.typing";
import Calm from "./calm/Calm";
import Classic from "./classic/Classic";

const Viewer = ({ data, meta }: ResumeViewer) => {
  const templateProps = { data, meta };

  const templates: { [key: string]: ReactNode } = {
    classic: <Classic {...templateProps} />,
    calm: <Calm {...templateProps} />,
  };

  return <Document>{templates[meta.template]}</Document>;
};

//@ts-ignore
export default <Viewer />;

import React, { ReactNode } from "react";
import { Document } from "@react-pdf/renderer";
import Calm from "./calm/Calm";
import Classic from "./classic/Classic";
import { ResumeViewer } from "../Resume.typing";

const Viewer = ({ data }: ResumeViewer) => {
  const templates: { [key: string]: ReactNode } = {
    classic: <Classic data={data} />,
    calm: <Calm data={data} />,
  };

  return <Document>{templates[data.meta.template]}</Document>;
};

//@ts-ignore
export default <Viewer />;

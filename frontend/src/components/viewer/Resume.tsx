import React, { ReactElement } from "react";
import { StyleSheet, Document, Page } from "@react-pdf/renderer";

import Info from "./sections/Info";
import Skills from "./sections/Skills";
import Experience from "./sections/Experience";
import TwoColumns from "./sections/parts/TwoColumns";
import Column from "./sections/parts/Column";

import { ResumeViewer } from "../../typings/Resume.typing";

const Resume = ({ data, activeSection }: ResumeViewer) => {
  const { skills, experience, info, meta } = data;
  const { fontSize, paper, content, fontFamily } = meta;
  const { split, full } = content;
  const { leftOrder, rightOrder } = split;
  const { order } = full;
  const { layout } = paper;

  const styles = StyleSheet.create({
    page: {
      backgroundColor: "#fff",
      fontFamily: fontFamily + "-Bold",
      fontSize: fontSize.small,
      paddingVertical: paper.space / 2,
    },
  });

  const openSectionUnlisted =
    layout === "split"
      ? split.unlisted.includes(activeSection)
      : full.unlisted.includes(activeSection);

  const getActivity = (name: "skills" | "info" | "experience") =>
    !activeSection || openSectionUnlisted || activeSection === name;

  const sections: { [key: string]: ReactElement | undefined } = {
    skills: skills ? (
      <Skills
        isActive={getActivity("skills")}
        meta={meta}
        key={"skills-viewer"}
        {...skills}
      />
    ) : undefined,
    experience: experience ? (
      <Experience
        isActive={getActivity("experience")}
        meta={meta}
        key={"experience-viewer"}
        {...experience}
      />
    ) : undefined,
  };

  const emptyStateActive = !activeSection || openSectionUnlisted;
  const commonProps = {
    emptyStateActive,
    meta,
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {info && <Info isActive={getActivity("info")} meta={meta} {...info} />}
        {layout === "split" && (
          <TwoColumns
            {...commonProps}
            leftChildren={leftOrder.map((member) => sections[member])}
            rightChildren={rightOrder.map((member) => sections[member])}
          />
        )}
        {layout === "full" && (
          <Column
            {...commonProps}
            children={order.map((member) => sections[member])}
          />
        )}
      </Page>
    </Document>
  );
};

//@ts-ignore
export default <Resume />;

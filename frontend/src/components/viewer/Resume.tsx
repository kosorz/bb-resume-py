import React, { ReactElement } from "react";
import { StyleSheet, Document, Page, Image } from "@react-pdf/renderer";

import Info from "./sections/Info";
import Skills from "./sections/Skills";
import Experience from "./sections/Experience";
import TwoColumns from "./sections/parts/TwoColumns";
import Column from "./sections/parts/Column";

import { ResumeViewer } from "../../typings/Resume.typing";

const Resume = ({ data, activeSection, meta }: ResumeViewer) => {
  const { skills, experience, info } = data;
  const { fontSize, paper, content, fontFamily, colors, background } = meta;
  const { split, full } = content;
  const { leftOrder, rightOrder } = split;
  const { order } = full;
  const { layout } = paper;

  const unlistedSectionOpen =
    layout === "split"
      ? split.unlisted.includes(activeSection)
      : full.unlisted.includes(activeSection);

  const noContentSectionOpen = ["catalogue", "meta"].includes(activeSection);

  const checkIfActive = (name: "skills" | "info" | "experience") =>
    !activeSection ||
    unlistedSectionOpen ||
    activeSection === name ||
    noContentSectionOpen;

  const styles = StyleSheet.create({
    page: {
      backgroundColor: "#fff",
      fontFamily: fontFamily + "-Bold",
      fontSize: fontSize.small,
      paddingVertical: paper.space / 2,
      color: colors.secondary,
      opacity:
        unlistedSectionOpen || !activeSection || noContentSectionOpen ? 1 : 0.4,
    },
    pageBackground: {
      position: "absolute",
      minWidth: "100%",
      minHeight: "100%",
      height: "100%",
      width: "100%",
    },
  });

  const sections: { [key: string]: ReactElement | undefined } = {
    skills: skills ? (
      <Skills
        isActive={checkIfActive("skills")}
        meta={meta}
        key={"skills-viewer"}
        {...skills}
      />
    ) : undefined,
    experience: experience ? (
      <Experience
        isActive={checkIfActive("experience")}
        meta={meta}
        key={"experience-viewer"}
        {...experience}
      />
    ) : undefined,
  };

  const emptyStateActive =
    !activeSection || unlistedSectionOpen || noContentSectionOpen;

  const commonProps = {
    emptyStateActive,
    meta,
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Image
          fixed
          style={styles.pageBackground}
          source={`/backgrounds/${background}.png`}
        />
        {info && (
          <Info isActive={checkIfActive("info")} meta={meta} {...info} />
        )}
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

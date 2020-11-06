import React from "react";
import { View, StyleSheet, Text } from "@react-pdf/renderer";
import { DateTime } from "luxon";

import SubSectionHeadline from "./parts/SubSectionHeadline";
import Data from "./parts/Data";

import { ExperienceUnitViewer } from "../../../typings/ExperienceUnit.typing";

const ExperienceUnit = ({
  meta,
  title,
  company_name,
  description,
  location,
  date_start,
  date_end,
  link,
  company_name_enabled,
  description_enabled,
  location_enabled,
  period_enabled,
  link_enabled,
}: ExperienceUnitViewer) => {
  const { paper, fontFamily, fontSize } = meta;

  const styles = StyleSheet.create({
    experienceUnit: {
      marginBottom: paper.space / 4,
    },
    companyName: {
      fontFamily: fontFamily + "-Black",
      marginBottom: paper.space / 20,
    },
    timeAndGeo: {
      display: "flex",
      flexDirection: "row",
      fontSize: fontSize.small,
    },
    info: {
      fontSize: fontSize.small,
    },
    description: {
      fontSize: fontSize.small,
      marginTop: paper.space / 10,
    },
  });

  return (
    <View style={styles.experienceUnit} wrap={false}>
      <SubSectionHeadline text={title} fallback={"Title"} meta={meta} />
      {company_name_enabled && (
        <Text style={styles.companyName}>{company_name || "COMPANY NAME"}</Text>
      )}
      <View style={styles.timeAndGeo}>
        {period_enabled && (
          <Data
            type={"date"}
            value={
              DateTime.fromISO(date_start).toFormat("MM/yyyy") +
              (date_end
                ? " - " + DateTime.fromISO(date_end).toFormat("MM/yyyy")
                : "")
            }
          />
        )}
        {location_enabled && <Data type="location" value={location} />}
      </View>
      {link_enabled && <Data type="link" style={styles.info} value={link} />}
      {description_enabled && (
        <Text style={styles.description}>
          {description || "Lorem ipsum..."}
        </Text>
      )}
    </View>
  );
};

export default ExperienceUnit;

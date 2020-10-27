import React from "react";
import { View, StyleSheet, Text } from "@react-pdf/renderer";
import { DateTime } from "luxon";

import SubSectionHeadline from "./parts/SubSectionHeadline";
import Data from "./parts/Data";

import { ExperienceUnitViewer } from "../../../typings/ExperienceUnit.typing";

const ExperienceUnit = ({
  theme,
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
  const styles = StyleSheet.create({
    experienceUnit: {
      marginBottom: theme.paper.space / 4,
    },
    companyName: {
      fontFamily: theme.fontFamily.black,
      marginBottom: theme.paper.space / 20,
    },
    timeAndGeo: {
      display: "flex",
      flexDirection: "row",
      fontSize: theme.fontSize.small,
    },
    info: {
      fontSize: theme.fontSize.small,
    },
    description: {
      fontSize: theme.fontSize.small,
      marginTop: theme.paper.space / 10,
    },
  });

  return (
    <View style={styles.experienceUnit} wrap={false}>
      <SubSectionHeadline text={title} fallback={"Title"} theme={theme} />
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
        <Text style={styles.description}>{description}</Text>
      )}
    </View>
  );
};

export default ExperienceUnit;

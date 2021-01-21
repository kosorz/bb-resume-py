import React from "react";
import { View, StyleSheet, Text } from "@react-pdf/renderer";
import { DateTime } from "luxon";

import SubSectionHeadline from "../components/SubSectionHeadline";

import { ExperienceUnitViewer } from "../../../editor/sections/Experience/ExperienceUnit.typing";

const ExperienceUnit = ({
  meta,
  title,
  company_name,
  description,
  date_start,
  date_end,
  company_name_enabled,
  description_enabled,
  period_enabled,
}: ExperienceUnitViewer) => {
  const { paper, fontSize } = meta;

  const styles = StyleSheet.create({
    experienceUnit: {
      marginBottom: paper.space / 3,
      fontSize: fontSize.small,
    },
  });

  return (
    <View style={styles.experienceUnit} wrap={false}>
      <Text>
        {period_enabled && (
          <>
            from{" "}
            {DateTime.fromISO(
              date_start || DateTime.local().toString()
            ).toFormat("MM/yyyy")}{" "}
            to{" "}
            {DateTime.fromISO(date_end || DateTime.local().toString()).toFormat(
              "MM/yyyy"
            )}
          </>
        )}
        {company_name_enabled && period_enabled ? " | " : ""}
        {company_name_enabled ? `${company_name || "COMPANY NAME"}` : ""}
      </Text>
      <SubSectionHeadline text={title} fallback={"Title"} meta={meta} />
      {description_enabled && (
        <Text>
          {description || "Experience description will appear here..."}
        </Text>
      )}
    </View>
  );
};

export default ExperienceUnit;

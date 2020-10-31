import React, { useContext } from "react";
import { useFormik } from "formik";

import Area from "./parts/Area";
import Input from "./parts/Input";
import Checkbox from "./parts/Checkbox";
import SubSection from "./parts/SubSection";
import Form from "./parts/Form";
import Settings from "./parts/Settings";
import Values from "./parts/Values";
import VerticalKnobs from "./parts/VerticalKnobs";

import { getFieldProps, saveChangedValues } from "../../../util/fns";
import { ResumeBubble } from "../../../bubbles/ResumeBubble";
import { observer } from "mobx-react-lite";
import { ExperienceUnitEditor } from "../../../typings/ExperienceUnit.typing";
import { useFormikAutoSave } from "../../../util/hooks";
import { experienceUnitValidationSchema } from "../validationSchemas";

const ExperienceUnit = observer((props: ExperienceUnitEditor) => {
  const resumeBubble = useContext(ResumeBubble);
  const { id, deleted, isLast, ...experienceUnitEditorData } = props;

  const formik = useFormik({
    initialValues: experienceUnitEditorData,
    onSubmit: (values) => {
      saveChangedValues(
        values,
        experienceUnitEditorData,
        `/parts/experience_unit/${id}`,
        resumeBubble.updateExperienceUnit
      );
    },
    validationSchema: experienceUnitValidationSchema,
  });
  useFormikAutoSave(formik);

  return (
    <SubSection isLast={isLast}>
      <Form>
        <Values>
          <legend>Experience details</legend>
          <Input {...getFieldProps(formik, "title")} placeholder="Title" />
          <Input
            {...getFieldProps(formik, "company_name")}
            placeholder="Company Name"
          />
          <Input
            {...getFieldProps(formik, "location")}
            placeholder="Location"
          />
          <Input {...getFieldProps(formik, "link")} placeholder="Link" />
          <Area
            {...getFieldProps(formik, "description")}
            placeholder="Description"
          />
        </Values>
        <Settings>
          <legend>Settings</legend>
          <Checkbox {...getFieldProps(formik, "company_name_enabled")} />
          <Checkbox {...getFieldProps(formik, "description_enabled")} />
          <Checkbox {...getFieldProps(formik, "location_enabled")} />
          <Checkbox {...getFieldProps(formik, "period_enabled")} />
          <Checkbox {...getFieldProps(formik, "link_enabled")} />
        </Settings>
      </Form>
      <VerticalKnobs />
    </SubSection>
  );
});

export default ExperienceUnit;

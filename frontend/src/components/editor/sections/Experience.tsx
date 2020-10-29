import React, { useContext } from "react";
import { useFormik } from "formik";
import { observer } from "mobx-react-lite";

import Input from "./parts/Input";
import ExperienceUnit from "./ExperienceUnit";
import Checkbox from "./parts/Checkbox";
import Section from "./parts/Section";

import { getFieldProps, saveChangedValues } from "../../../util/fns";
import { ResumeBubble } from "../../../bubbles/ResumeBubble";
import { useFormikAutoSave } from "../../../util/hooks";
import { experienceValidationSchema } from "../validationSchemas";

const Experience = observer(() => {
  const resumeBubble = useContext(ResumeBubble);
  const {
    id,
    units,
    ...experienceEditorData
  } = resumeBubble.resume.experience!;

  const formik = useFormik({
    initialValues: experienceEditorData,
    onSubmit: (values) => {
      saveChangedValues(
        values,
        experienceEditorData,
        `/parts/experience/${id}`,
        resumeBubble.updateExperience
      );
    },
    validationSchema: experienceValidationSchema,
  });
  useFormikAutoSave(formik);

  return (
    <Section>
      <form>
        <Input {...getFieldProps(formik, "title")} placeholder="Name" />
        <Checkbox {...getFieldProps(formik, "deleted")} />
      </form>
      {units
        .filter((gr) => !gr.deleted)
        .map((gr, i) => (
          <ExperienceUnit key={`experience_unit_${i}`} {...gr} />
        ))}
    </Section>
  );
});

export default Experience;

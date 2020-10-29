import React from "react";
import { useFormik } from "formik";
import { observer } from "mobx-react-lite";

import Input from "./parts/Input";
import Checkbox from "./parts/Checkbox";
import SkillsGroup from "./SkillsGroup";
import Section from "./parts/Section";

import { getFieldProps, saveChangedValues } from "../../../util/fns";
import { ResumeBubble } from "../../../bubbles/ResumeBubble";
import { useFormikAutoSave } from "../../../util/hooks";
import { skillsValidationSchema } from "../validationSchemas";

const Skills = observer(() => {
  const resumeBubble = React.useContext(ResumeBubble);
  const { id, groups, ...skillsEditorData } = resumeBubble.resume.skills!;

  const formik = useFormik({
    initialValues: skillsEditorData,
    onSubmit: (values) => {
      saveChangedValues(
        values,
        skillsEditorData,
        `/parts/skills/${id}`,
        resumeBubble.updateSkills
      );
    },
    validationSchema: skillsValidationSchema,
  });
  useFormikAutoSave(formik);

  return (
    <Section>
      <form>
        <Input {...getFieldProps(formik, "title")} placeholder="Name" />
        <Checkbox {...getFieldProps(formik, "deleted")} />
      </form>
      {groups
        .filter((gr) => !gr.deleted)
        .map((gr, i) => (
          <SkillsGroup key={`skills_group_${i}`} {...gr} />
        ))}
    </Section>
  );
});

export default Skills;

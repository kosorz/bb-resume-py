import React, { useContext } from "react";
import { useFormik } from "formik";
import { observer } from "mobx-react-lite";

import Input from "./parts/Input";
import Checkbox from "./parts/Checkbox";
import SubForm from "./parts/SubForm";

import { getFieldProps, saveChangedValues } from "../../../util/fns";
import { SkillsGroupEditor } from "../../../typings/SkillsGroup.typing";
import { ResumeBubble } from "../../../bubbles/ResumeBubble";
import { useFormikAutoSave } from "../../../util/hooks";
import { skillsGroupValidationSchema } from "../validationSchemas";

const SkillsGroup = observer((props: SkillsGroupEditor) => {
  const resumeBubble = useContext(ResumeBubble);
  const { id, ...skillsGroupEditorData } = props;
  const formik = useFormik({
    initialValues: skillsGroupEditorData,
    onSubmit: (values) => {
      saveChangedValues(
        values,
        skillsGroupEditorData,
        `/parts/skills_group/${id}`,
        resumeBubble.updateSkillsGroup
      );
    },
    validationSchema: skillsGroupValidationSchema,
  });
  useFormikAutoSave(formik);

  return (
    <SubForm>
      <Input {...getFieldProps(formik, "title")} placeholder="Name" />
      <Checkbox {...getFieldProps(formik, "deleted")} />
    </SubForm>
  );
});

export default SkillsGroup;

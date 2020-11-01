import React, { useContext } from "react";
import { useFormik } from "formik";
import { observer } from "mobx-react-lite";

import Input from "./parts/Input";
import Area from "./parts/Area";
import SubSection from "./parts/SubSection";
import Form from "./parts/Form";
import VerticalKnobs from "./parts/VerticalKnobs";
import Values from "./parts/Values";

import { getFieldProps, saveChangedValues } from "../../../util/fns";
import { SkillsGroupEditor } from "../../../typings/SkillsGroup.typing";
import { ResumeBubble } from "../../../bubbles/ResumeBubble";
import { useFormikAutoSave } from "../../../util/hooks";
import { skillsGroupValidationSchema } from "../validationSchemas";

const SkillsGroup = observer(
  ({ id, isLast, isFirst, ...skillsGroupEditorData }: SkillsGroupEditor) => {
    const resumeBubble = useContext(ResumeBubble);
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
      <SubSection isLast={isLast}>
        <Form>
          <Values>
            <legend>Group details</legend>
            <Input {...getFieldProps(formik, "title")} placeholder="Name" />
            <Area
              {...getFieldProps(formik, "values")}
              placeholder="Communication,problem solving,stress handling"
            />
          </Values>
        </Form>
        <VerticalKnobs renderDown={!isLast} renderUp={!isFirst} />
      </SubSection>
    );
  }
);

export default SkillsGroup;

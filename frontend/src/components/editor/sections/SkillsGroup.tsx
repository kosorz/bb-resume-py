import React, { useContext } from "react";
import { useFormik } from "formik";
import { observer } from "mobx-react-lite";
import styled from "styled-components";

import Input from "./parts/Input";
import Area from "./parts/Area";
import SubSection from "./parts/SubSection";
import Form from "./parts/Form";
import VerticalKnobs from "./parts/VerticalKnobs";

import { getFieldProps, saveChangedValues } from "../../../util/fns";
import { SkillsGroupEditor } from "../../../typings/SkillsGroup.typing";
import { ResumeBubble } from "../../../bubbles/ResumeBubble";
import { useFormikAutoSave } from "../../../util/hooks";
import { skillsGroupValidationSchema } from "../validationSchemas";

const FieldsHolder = styled.fieldset`
  flex-wrap: wrap;
  display: flex;
  border-radius: ${({ theme }) => theme.space / 2 + "px"};
  border: ${({ theme }) => "1px solid" + theme.gray};
  flex: 100%;

  input,
  label {
    flex: 100%;
  }
`;

const SkillsGroup = observer((props: SkillsGroupEditor) => {
  const resumeBubble = useContext(ResumeBubble);
  const { id, deleted, ...skillsGroupEditorData } = props;
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
    <SubSection>
      <Form>
        <FieldsHolder>
          <Input {...getFieldProps(formik, "title")} placeholder="Name" />
          <Area
            {...getFieldProps(formik, "values")}
            placeholder="Communication,problem solving,stress handling"
          />
        </FieldsHolder>
      </Form>
      <VerticalKnobs />
    </SubSection>
  );
});

export default SkillsGroup;

import React, { useContext } from "react";
import { useFormik } from "formik";
import { observer } from "mobx-react-lite";

import Input from "./parts/Input";
import Area from "./parts/Area";
import SubSection from "./parts/SubSection";
import Form from "./parts/Form";
import Values from "./parts/Values";

import { getFieldProps, saveChangedValues } from "../../../util/fns";
import { SkillsGroupEditor } from "../../../typings/SkillsGroup.typing";
import { ResumeBubble } from "../../../bubbles/ResumeBubble";
import { useFormikAutoSave } from "../../../util/hooks";
import { skillsGroupValidationSchema } from "../validationSchemas";
import axios from "../../../util/axios";

const SkillsGroup = observer(
  ({
    id,
    isLast,
    isFirst,
    hasSiblings,
    ...skillsGroupEditorData
  }: SkillsGroupEditor) => {
    const resumeBubble = useContext(ResumeBubble);
    const {
      updateSkillsGroup,
      removeSkillsGroup,
      updateSkillsOrder,
    } = resumeBubble;

    const formik = useFormik({
      initialValues: skillsGroupEditorData,
      onSubmit: (values) => {
        saveChangedValues(
          values,
          skillsGroupEditorData,
          `/parts/skills_group/${id}`,
          updateSkillsGroup
        );
      },
      validationSchema: skillsGroupValidationSchema,
    });
    useFormikAutoSave(formik);

    const deleteFn = () =>
      axios.delete(`/parts/skills_group/${id}`).then((res) => {
        removeSkillsGroup(res.data);
      });

    const changeOrder = (dir: string) => {
      axios
        .post(`/parts/skills_group/${id}/move/${dir}`)
        .then((res) => updateSkillsOrder(res.data));
    };

    return (
      <SubSection
        renderDelete={hasSiblings}
        title={"group"}
        onUp={() => changeOrder("up")}
        onDown={() => changeOrder("down")}
        isLast={isLast}
        isFirst={isFirst}
        deleteFn={deleteFn}
      >
        <Form>
          <Values>
            <Input {...getFieldProps(formik, "title")} placeholder="Name" />
            <Area
              {...getFieldProps(formik, "values")}
              placeholder="Communication,problem solving,stress handling"
            />
          </Values>
        </Form>
      </SubSection>
    );
  }
);

export default SkillsGroup;

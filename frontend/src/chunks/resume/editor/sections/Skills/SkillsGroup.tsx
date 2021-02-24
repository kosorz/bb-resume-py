import React, { useContext } from "react";
import { useFormik } from "formik";
import { observer } from "mobx-react-lite";
import { useMutation } from "react-query";

import Input from "../../../../../components/formik/Input";
import SubSection from "../../components/SubSection";
import Form from "../../../../../components/formik/Form";
import CollectionArea from "../../../../../components/formik/CollectionArea";

import { getFieldPropsMeta, saveChangedValues } from "../../../../../util/fns";
import { SkillsGroupEditor } from "./SkillsGroup.typing";
import { ResumeBubble } from "../../../Resume.bubble";
import { useFormikAutoSave } from "../../../../../util/hooks";
import { skillsGroupValidationSchema } from "../../../../../util/validationSchemas";
import axios from "../../../../../util/axios";

const SkillsGroup = observer(
  ({
    i,
    id,
    isLast,
    isFirst,
    hasSiblings,
    wobble,
    ...skillsGroupEditorData
  }: SkillsGroupEditor) => {
    const resumeBubble = useContext(ResumeBubble);
    const {
      openSubSections,
      setOpenSubSection,
      updateSkillsGroup,
      removeSkillsGroup,
    } = resumeBubble;
    const opened = openSubSections["skills"] === id;

    const formik = useFormik({
      initialValues: skillsGroupEditorData,
      onSubmit: (values) => {
        saveChangedValues(
          values,
          skillsGroupEditorData,
          `/parts/skills_group/${id}`,
          updateSkillsGroup(id)
        );
      },
      validationSchema: skillsGroupValidationSchema,
    });
    useFormikAutoSave(formik);

    const deleteUnit = useMutation(
      () => axios.delete(`/parts/skills_group/${id}`),
      {
        onMutate: () => {
          opened && setOpenSubSection("skills", undefined);
        },
        onSuccess: (res) => {
          setTimeout(() => removeSkillsGroup(res.data), 350);
        },
      }
    );

    return (
      <SubSection
        id={id}
        wobble={wobble}
        opened={opened}
        identifier={"skills"}
        renderDelete={hasSiblings}
        title={skillsGroupEditorData.title || `Skills ${i}`}
        isLast={isLast}
        isFirst={isFirst}
        deleteFn={deleteUnit.mutate}
      >
        <Form>
          <Input
            {...getFieldPropsMeta(formik, "title")}
            placeholder="Enter skills group name"
            withSpace={false}
          />
          <CollectionArea
            {...getFieldPropsMeta(formik, "values")}
            placeholder="Communication, problem solving, stress handling"
            withSpace={false}
          />
        </Form>
      </SubSection>
    );
  }
);

export default SkillsGroup;

import React, { useContext } from "react";
import { useFormik } from "formik";
import { observer } from "mobx-react-lite";
import { useMutation } from "react-query";

import Area from "../../../../../components/formik/Area";
import Input from "../../../../../components/formik/Input";
import VisibilityToggle from "../../../../../components/VisibilityToggle";
import SubSection from "../../components/SubSection";
import Form from "../../../../../components/formik/Form";

import { experienceUnitValidationSchema } from "../../../../../util/validationSchemas";
import { getFieldPropsMeta, saveChangedValues } from "../../../../../util/fns";
import { ResumeBubble } from "../../../Resume.bubble";
import { ExperienceUnitEditor } from "./ExperienceUnit.typing";
import { useFormikAutoSave } from "../../../../../util/hooks";
import axios from "../../../../../util/axios";

const ExperienceUnit = observer(
  ({
    i,
    id,
    isLast,
    isFirst,
    hasSiblings,
    wobble,
    ...experienceUnitEditorData
  }: ExperienceUnitEditor) => {
    const resumeBubble = useContext(ResumeBubble);
    const {
      resume,
      openSubSections,
      setOpenSubSection,
      updateExperienceUnit,
      removeExperienceUnit,
    } = resumeBubble;
    const { template } = resume.meta;
    const opened = openSubSections["experience"] === id;

    const formik = useFormik({
      initialValues: experienceUnitEditorData,
      onSubmit: (values) => {
        saveChangedValues(
          values,
          experienceUnitEditorData,
          `/parts/experience_unit/${id}`,
          updateExperienceUnit(id)
        );
      },
      validationSchema: experienceUnitValidationSchema,
    });
    useFormikAutoSave(formik);

    const deleteUnit = useMutation(
      () => axios.delete(`/parts/experience_unit/${id}`),
      {
        onMutate: () => {
          opened && setOpenSubSection("experience", undefined);
        },
        onSuccess: (res) => {
          setTimeout(() => removeExperienceUnit(res.data), 350);
        },
      }
    );

    return (
      <SubSection
        id={id}
        opened={opened}
        wobble={wobble}
        identifier={"experience"}
        renderDelete={hasSiblings}
        title={experienceUnitEditorData.title || `Experience ${i}`}
        isLast={isLast}
        isFirst={isFirst}
        deleteFn={deleteUnit.mutate}
      >
        <Form>
          <Input
            {...getFieldPropsMeta(formik, "title")}
            placeholder="Enter experience title"
          />
          <Input
            {...getFieldPropsMeta(formik, "company_name")}
            placeholder="Enter company name"
            toggle={
              <VisibilityToggle
                {...getFieldPropsMeta(formik, "company_name_enabled")}
              />
            }
          />
          {template === "classic" && (
            <>
              <Input
                {...getFieldPropsMeta(formik, "location")}
                placeholder="Enter location"
                toggle={
                  <VisibilityToggle
                    {...getFieldPropsMeta(formik, "location_enabled")}
                  />
                }
              />
              <Input
                {...getFieldPropsMeta(formik, "link")}
                placeholder="Enter website link"
                toggle={
                  <VisibilityToggle
                    {...getFieldPropsMeta(formik, "link_enabled")}
                  />
                }
              />
            </>
          )}
          <Area
            {...getFieldPropsMeta(formik, "description")}
            placeholder="Enter experience description"
            toggle={
              <VisibilityToggle
                {...getFieldPropsMeta(formik, "description_enabled")}
              />
            }
          />
        </Form>
      </SubSection>
    );
  }
);

export default ExperienceUnit;

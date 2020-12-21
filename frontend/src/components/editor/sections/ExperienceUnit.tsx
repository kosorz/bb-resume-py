import React, { useContext } from "react";
import { useFormik } from "formik";
import { observer } from "mobx-react-lite";

import Area from "./parts/formik/Area";
import Input from "./parts/formik/Input";
import Toggle from "./parts/formik/Toggle";
import SubSection from "./parts/SubSection";
import Form from "./parts/formik/Form";

import { experienceUnitValidationSchema } from "../validationSchemas";
import { getFieldPropsMeta, saveChangedValues } from "../../../util/fns";
import { ResumeBubble } from "../../../bubbles/ResumeBubble";
import { ExperienceUnitEditor } from "../../../typings/ExperienceUnit.typing";
import { useFormikAutoSave } from "../../../util/hooks";
import axios from "../../../util/axios";

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
    const { template } = resume.meta!;
    const opened = openSubSections["experience"] === id;

    const formik = useFormik({
      initialValues: experienceUnitEditorData,
      onSubmit: (values) => {
        saveChangedValues(
          values,
          experienceUnitEditorData,
          `/parts/experience_unit/${id}`,
          updateExperienceUnit
        );
      },
      validationSchema: experienceUnitValidationSchema,
    });
    useFormikAutoSave(formik);

    const deleteFn = () =>
      axios.delete(`/parts/experience_unit/${id}`).then((res) => {
        opened && setOpenSubSection("experience", undefined);
        setTimeout(() => removeExperienceUnit(res.data), 350);
      });

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
        deleteFn={deleteFn}
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
              <Toggle {...getFieldPropsMeta(formik, "company_name_enabled")} />
            }
          />
          {template !== "calm" && (
            <>
              <Input
                {...getFieldPropsMeta(formik, "location")}
                placeholder="Enter location"
                toggle={
                  <Toggle {...getFieldPropsMeta(formik, "location_enabled")} />
                }
              />
              <Input
                {...getFieldPropsMeta(formik, "link")}
                placeholder="Enter website link"
                toggle={
                  <Toggle {...getFieldPropsMeta(formik, "link_enabled")} />
                }
              />
            </>
          )}
          <Area
            {...getFieldPropsMeta(formik, "description")}
            placeholder="Enter experience description"
            toggle={
              <Toggle {...getFieldPropsMeta(formik, "description_enabled")} />
            }
          />
        </Form>
      </SubSection>
    );
  }
);

export default ExperienceUnit;

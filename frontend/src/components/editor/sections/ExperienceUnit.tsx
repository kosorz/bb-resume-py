import React, { useContext } from "react";
import { useFormik } from "formik";

import Area from "./parts/formik/Area";
import Input from "./parts/formik/Input";
import Toggle from "./parts/Toggle";
import SubSection from "./parts/SubSection";
import Form from "./parts/formik/Form";

import { getFieldProps, saveChangedValues } from "../../../util/fns";
import { ResumeBubble } from "../../../bubbles/ResumeBubble";
import { observer } from "mobx-react-lite";
import { ExperienceUnitEditor } from "../../../typings/ExperienceUnit.typing";
import { useFormikAutoSave } from "../../../util/hooks";
import { experienceUnitValidationSchema } from "../validationSchemas";
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
      openSubSections,
      setOpenSubSection,
      updateExperienceUnit,
      removeExperienceUnit,
      // updateSubSectionsOrder,
    } = resumeBubble;
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
            {...getFieldProps(formik, "title")}
            placeholder="Enter experience title"
          />
          <Input
            {...getFieldProps(formik, "company_name")}
            placeholder="Enter company name"
            toggle={
              <Toggle {...getFieldProps(formik, "company_name_enabled")} />
            }
          />
          <Input
            {...getFieldProps(formik, "location")}
            placeholder="Enter location"
            toggle={<Toggle {...getFieldProps(formik, "location_enabled")} />}
          />
          <Input
            {...getFieldProps(formik, "link")}
            placeholder="Enter website link"
            toggle={<Toggle {...getFieldProps(formik, "link_enabled")} />}
          />
          <Area
            {...getFieldProps(formik, "description")}
            placeholder="Enter experience description"
            toggle={
              <Toggle {...getFieldProps(formik, "description_enabled")} />
            }
          />
        </Form>
      </SubSection>
    );
  }
);

export default ExperienceUnit;

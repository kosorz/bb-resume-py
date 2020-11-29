import React, { useContext } from "react";
import { useFormik } from "formik";

import Area from "./parts/Area";
import Input from "./parts/Input";
import Checkbox from "./parts/Checkbox";
import SubSection from "./parts/SubSection";
import Form from "./parts/Form";
import Settings from "./parts/Settings";
import Values from "./parts/Values";

import { getFieldProps, saveChangedValues } from "../../../util/fns";
import { ResumeBubble } from "../../../bubbles/ResumeBubble";
import { observer } from "mobx-react-lite";
import { ExperienceUnitEditor } from "../../../typings/ExperienceUnit.typing";
import { useFormikAutoSave } from "../../../util/hooks";
import { experienceUnitValidationSchema } from "../validationSchemas";
import axios from "../../../util/axios";

const ExperienceUnit = observer(
  ({
    id,
    isLast,
    isFirst,
    hasSiblings,
    ...experienceUnitEditorData
  }: ExperienceUnitEditor) => {
    const resumeBubble = useContext(ResumeBubble);
    const {
      updateExperienceUnit,
      removeExperienceUnit,
      updateExperienceOrder,
    } = resumeBubble;

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
        removeExperienceUnit(res.data);
      });

    const changeOrder = (dir: string) => {
      axios
        .post(`/parts/experience_unit/${id}/move/${dir}`)
        .then((res) => updateExperienceOrder(res.data));
    };

    return (
      <SubSection
        renderDelete={hasSiblings}
        title={"experience"}
        onUp={() => changeOrder("up")}
        onDown={() => changeOrder("down")}
        isLast={isLast}
        isFirst={isFirst}
        deleteFn={deleteFn}
      >
        <Form>
          <Values>
            <Input {...getFieldProps(formik, "title")} placeholder="Title" />
            <Input
              {...getFieldProps(formik, "company_name")}
              placeholder="Company Name"
            />
            <Input
              {...getFieldProps(formik, "location")}
              placeholder="Location"
            />
            <Input {...getFieldProps(formik, "link")} placeholder="Link" />
            <Area
              {...getFieldProps(formik, "description")}
              placeholder="Description"
            />
          </Values>
          <Settings>
            <Checkbox {...getFieldProps(formik, "company_name_enabled")} />
            <Checkbox {...getFieldProps(formik, "description_enabled")} />
            <Checkbox {...getFieldProps(formik, "location_enabled")} />
            <Checkbox {...getFieldProps(formik, "period_enabled")} />
            <Checkbox {...getFieldProps(formik, "link_enabled")} />
          </Settings>
        </Form>
      </SubSection>
    );
  }
);

export default ExperienceUnit;

import * as React from "react";
import { useFormik } from "formik";
import cn from "classnames";

import Input from "../Input/Input";
import Checkbox from "../Checkbox/Checkbox";

import axios from "../../util/axios";
import { getFieldProps } from "../../util/fns";
import { ExperienceUnitEditor } from "./ExperienceUnit.typing";

const ExperienceUnit = ({
  id,
  title,
  company_name,
  description,
  location,
  date_start,
  date_end,
  link,
  company_name_enabled,
  description_enabled,
  location_enabled,
  period_enabled,
  link_enabled,
  className,
}: ExperienceUnitEditor) => {
  const formik = useFormik({
    initialValues: {
      id,
      title,
      company_name,
      description,
      location,
      date_start,
      date_end,
      link,
      company_name_enabled,
      description_enabled,
      location_enabled,
      period_enabled,
      link_enabled,
    },
    enableReinitialize: true,
    onSubmit: (values) => axios.patch(`/parts/experience_unit/${id}`, values),
  });

  const { values } = formik;

  return (
    <div className={cn(className)}>
      <form>
        <Checkbox {...getFieldProps(formik, "company_name_enabled")} />
        <Checkbox {...getFieldProps(formik, "description_enabled")} />
        <Checkbox {...getFieldProps(formik, "location_enabled")} />
        <Checkbox {...getFieldProps(formik, "period_enabled")} />
        <Checkbox {...getFieldProps(formik, "link_enabled")} />
        <Input {...getFieldProps(formik, "title")} placeholder="Title" />
        {values.company_name_enabled && (
          <Input
            {...getFieldProps(formik, "company_name")}
            placeholder="Company Name"
          />
        )}
        {values.description_enabled && (
          <Input
            {...getFieldProps(formik, "description")}
            placeholder="Description"
          />
        )}
        {values.location_enabled && (
          <Input
            {...getFieldProps(formik, "location")}
            placeholder="Location"
          />
        )}
        {values.period_enabled && (
          <>
            <Input
              {...getFieldProps(formik, "date_start")}
              placeholder="Today"
            />
            <Input {...getFieldProps(formik, "date_end")} placeholder="Today" />
          </>
        )}
        {values.link_enabled && (
          <Input {...getFieldProps(formik, "link")} placeholder="Link" />
        )}
        <button onClick={() => formik.submitForm()} type="button">
          Save Experience Unit {id}
        </button>
      </form>
    </div>
  );
};

export default ExperienceUnit;

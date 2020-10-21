import React, { useContext } from "react";
import { useFormik } from "formik";
import cn from "classnames";

import Input from "../Input/Input";
import Checkbox from "../Checkbox/Checkbox";

import axios from "../../util/axios";
import { getFieldProps } from "../../util/fns";
import { ExperienceUnitEditor } from "./ExperienceUnit.typing";
import { MobxContext } from "../../mobx";
import { observer } from "mobx-react-lite";

const ExperienceUnit = observer((props: ExperienceUnitEditor) => {
  const store = useContext(MobxContext);
  const { id, className, ...experienceUnitEditorData } = props;

  const formik = useFormik({
    initialValues: experienceUnitEditorData,
    enableReinitialize: true,
    onSubmit: (values) => {
      axios
        .patch(`/parts/experience_unit/${id}`, values)
        .then((res) => store.updateExperienceUnit(res.data))
        .catch((err) => console.log(err));
    },
  });

  const {
    company_name_enabled,
    description_enabled,
    location_enabled,
    period_enabled,
    link_enabled,
  } = formik.values;

  return (
    <div className={cn(className)}>
      <form>
        <Checkbox {...getFieldProps(formik, "company_name_enabled")} />
        <Checkbox {...getFieldProps(formik, "description_enabled")} />
        <Checkbox {...getFieldProps(formik, "location_enabled")} />
        <Checkbox {...getFieldProps(formik, "period_enabled")} />
        <Checkbox {...getFieldProps(formik, "link_enabled")} />
        <Input {...getFieldProps(formik, "title")} placeholder="Title" />
        {company_name_enabled && (
          <Input
            {...getFieldProps(formik, "company_name")}
            placeholder="Company Name"
          />
        )}
        {description_enabled && (
          <Input
            {...getFieldProps(formik, "description")}
            placeholder="Description"
          />
        )}
        {location_enabled && (
          <Input
            {...getFieldProps(formik, "location")}
            placeholder="Location"
          />
        )}
        {period_enabled && (
          <>
            <Input
              {...getFieldProps(formik, "date_start")}
              placeholder="Today"
            />
            <Input {...getFieldProps(formik, "date_end")} placeholder="Today" />
          </>
        )}
        {link_enabled && (
          <Input {...getFieldProps(formik, "link")} placeholder="Link" />
        )}
        <Checkbox {...getFieldProps(formik, "deleted")} />
        <button onClick={() => formik.submitForm()} type="button">
          Save Experience Unit {id}
        </button>
      </form>
    </div>
  );
});

export default ExperienceUnit;

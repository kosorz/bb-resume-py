import * as React from "react";
import { useFormik } from "formik";
import cn from "classnames";

import Input from "../Input/Input";
import ExperienceUnit from "../ExperienceUnit/ExperienceUnit";

import axios from "../../util/axios";
import { ExperienceEditor } from "./Experience.typing";
import { getFieldProps } from "../../util/fns";

const Experience = ({ id, title, units, className }: ExperienceEditor) => {
  const formik = useFormik({
    initialValues: {
      title,
    },
    enableReinitialize: true,
    onSubmit: (values) => axios.patch(`/parts/experience/${id}`, values),
  });

  return (
    <div className={cn(className)}>
      <form>
        <Input {...getFieldProps(formik, "title")} placeholder="Name" />
        <button onClick={() => formik.submitForm()} type="button">
          Save Experience
        </button>
      </form>
      {units
        .filter((gr) => !gr.deleted)
        .map((gr, i) => (
          <ExperienceUnit key={`experience_unit_${i}`} {...gr} />
        ))}
    </div>
  );
};

export default Experience;

import * as React from "react";
import { useFormik } from "formik";
import cn from "classnames";

import Input from "../Input/Input";

import axios from "../../util/axios";
import { getFieldProps } from "../../util/fns";

import { SkillsGroupEditor } from "./SkillsGroup.typing";

const SkillsGroup = ({ id, title, values, className }: SkillsGroupEditor) => {
  const formik = useFormik({
    initialValues: {
      id,
      title,
      values,
    },
    enableReinitialize: true,
    onSubmit: (values) => axios.patch(`/parts/skills_group/${id}`, values),
  });

  return (
    <div className={cn(className)}>
      <form>
        <Input {...getFieldProps(formik, "title")} placeholder="Name" />
        <button onClick={() => formik.submitForm()} type="button">
          Save Skills Group {id}
        </button>
      </form>
    </div>
  );
};

export default SkillsGroup;

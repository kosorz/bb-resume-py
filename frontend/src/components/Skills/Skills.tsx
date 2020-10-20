import * as React from "react";
import { useFormik } from "formik";
import cn from "classnames";

import Input from "../Input/Input";
import SkillsGroup from "../SkillsGroup/SkillsGroup";

import axios from "../../util/axios";
import { getFieldProps } from "../../util/fns";
import { SkillsEditor } from "./Skills.typing";

const Skills = ({ id, title, groups, className }: SkillsEditor) => {
  const formik = useFormik({
    initialValues: {
      title,
    },
    enableReinitialize: true,
    onSubmit: (values) => axios.patch(`/parts/skills/${id}`, values),
  });

  return (
    <div className={cn(className)}>
      <form>
        <Input {...getFieldProps(formik, "title")} placeholder="Name" />
        <button onClick={() => formik.submitForm()} type="button">
          Save Skills
        </button>
      </form>
      {groups
        .filter((gr) => !gr.deleted)
        .map((gr, i) => (
          <SkillsGroup key={`skills_group_${i}`} {...gr} />
        ))}
    </div>
  );
};

export default Skills;

import React, { useContext } from "react";
import { useFormik } from "formik";
import cn from "classnames";

import Input from "../Input/Input";
import ExperienceUnit from "../ExperienceUnit/ExperienceUnit";
import Checkbox from "../Checkbox/Checkbox";

import axios from "../../util/axios";
import { ExperienceEditor } from "./Experience.typing";
import { getFieldProps } from "../../util/fns";
import { MobxContext } from "../../mobx";
import { observer } from "mobx-react-lite";

const Experience = observer(({ className }: ExperienceEditor) => {
  const store = useContext(MobxContext);
  const { id, units, ...experienceEditorData } = store.resume.experience!;

  const formik = useFormik({
    initialValues: experienceEditorData,
    enableReinitialize: true,
    onSubmit: (values) => {
      axios
        .patch(`/parts/experience/${id}`, values)
        .then((res) => {
          store.updateExperience(res.data);
        })
        .catch((err) => console.log(err));
    },
  });

  return (
    <div className={cn(className)}>
      <form>
        <Input {...getFieldProps(formik, "title")} placeholder="Name" />
        <Checkbox {...getFieldProps(formik, "deleted")} />
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
});

export default Experience;

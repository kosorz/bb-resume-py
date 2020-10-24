import React, { useContext } from "react";
import { useFormik } from "formik";
import cn from "classnames";

import Input from "../Input/Input";
import ExperienceUnit from "../ExperienceUnit/ExperienceUnit";
import Checkbox from "../Checkbox/Checkbox";

import axios from "../../util/axios";
import { ExperienceEditor } from "./Experience.typing";
import { getFieldProps } from "../../util/fns";
import { ResumeBubble } from "../../Bubbles/ResumeBubble";
import { observer } from "mobx-react-lite";

const Experience = observer(({ className }: ExperienceEditor) => {
  const resumeBubble = useContext(ResumeBubble);
  const {
    id,
    units,
    ...experienceEditorData
  } = resumeBubble.resume.experience!;

  const formik = useFormik({
    initialValues: experienceEditorData,
    enableReinitialize: true,
    onSubmit: (values) => {
      axios
        .patch(`/parts/experience/${id}`, values)
        .then((res) => {
          resumeBubble.updateExperience(res.data);
        })
        .catch((err) => console.log(err));
    },
  });

  return (
    <section className={cn(className)}>
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
    </section>
  );
});

export default Experience;

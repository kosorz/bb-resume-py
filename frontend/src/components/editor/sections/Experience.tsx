import React, { useContext, useEffect } from "react";
import { useFormik } from "formik";
import { observer } from "mobx-react-lite";

import Input from "./parts/Input";
import ExperienceUnit from "./ExperienceUnit";
import Checkbox from "./parts/Checkbox";

import axios from "../../../util/axios";
import { getFieldProps } from "../../../util/fns";
import { ResumeBubble } from "../../../bubbles/ResumeBubble";
import { useDebounce } from "../../../util/hooks";

const Experience = observer(() => {
  const resumeBubble = useContext(ResumeBubble);
  const {
    id,
    units,
    ...experienceEditorData
  } = resumeBubble.resume.experience!;

  const formik = useFormik({
    initialValues: experienceEditorData,
    onSubmit: (values) => {
      axios
        .patch(`/parts/experience/${id}`, values)
        .then((res) => {
          resumeBubble.updateExperience(res.data);
        })
        .catch((err) => console.log(err));
    },
  });

  const debouncedValues = useDebounce(formik.values, 1000);

  useEffect(() => {
    resumeBubble.updateExperience({ ...debouncedValues, id, units });
  }, [debouncedValues, resumeBubble, id, units]);

  return (
    <section>
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

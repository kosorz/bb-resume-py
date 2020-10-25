import * as React from "react";
import { useFormik } from "formik";
import { observer } from "mobx-react-lite";

import Input from "./parts/Input";
import Checkbox from "./parts/Checkbox";
import SkillsGroup from "./SkillsGroup";

import axios from "../../../util/axios";
import { getFieldProps } from "../../../util/fns";
import { ResumeBubble } from "../../../bubbles/ResumeBubble";

const Skills = observer(() => {
  const store = React.useContext(ResumeBubble);
  const { id, groups, ...skillsEditorData } = store.resume.skills!;

  const formik = useFormik({
    initialValues: skillsEditorData,
    onSubmit: (values) => {
      axios
        .patch(`/parts/skills/${id}`, values)
        .then((res) => {
          store.updateSkills(res.data);
        })
        .catch((err) => console.log(err));
    },
  });

  return (
    <section>
      <form>
        <Input {...getFieldProps(formik, "title")} placeholder="Name" />
        <Checkbox {...getFieldProps(formik, "deleted")} />
        <button onClick={() => formik.submitForm()} type="button">
          Save Skills
        </button>
      </form>
      {groups
        .filter((gr) => !gr.deleted)
        .map((gr, i) => (
          <SkillsGroup key={`skills_group_${i}`} {...gr} />
        ))}
    </section>
  );
});

export default Skills;

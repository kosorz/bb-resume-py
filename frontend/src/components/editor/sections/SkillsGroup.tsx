import React, { useContext } from "react";
import { useFormik } from "formik";
import { observer } from "mobx-react-lite";

import Input from "./parts/Input";
import Checkbox from "./parts/Checkbox";

import axios from "../../../util/axios";
import { getFieldProps } from "../../../util/fns";

import { SkillsGroupEditor } from "../../../typings/SkillsGroup.typing";
import { ResumeBubble } from "../../../bubbles/ResumeBubble";

const SkillsGroup = observer((props: SkillsGroupEditor) => {
  const resumeBubble = useContext(ResumeBubble);
  const { id, ...skillsGroupEditorData } = props;

  const formik = useFormik({
    initialValues: skillsGroupEditorData,
    onSubmit: (values) => {
      axios
        .patch(`/parts/skills_group/${id}`, values)
        .then((res) => resumeBubble.updateSkillsGroup(res.data))
        .catch((err) => console.log(err));
    },
  });

  return (
    <section>
      <form>
        <Input {...getFieldProps(formik, "title")} placeholder="Name" />
        <Checkbox {...getFieldProps(formik, "deleted")} />
        <button onClick={() => formik.submitForm()} type="button">
          Save Skills Group {id}
        </button>
      </form>
    </section>
  );
});

export default SkillsGroup;

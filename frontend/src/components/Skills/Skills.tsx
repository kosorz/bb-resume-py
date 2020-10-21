import * as React from "react";
import { useFormik } from "formik";
import cn from "classnames";
import { observer } from "mobx-react-lite";

import Input from "../Input/Input";
import SkillsGroup from "../SkillsGroup/SkillsGroup";
import Checkbox from "../Checkbox/Checkbox";

import axios from "../../util/axios";
import { getFieldProps } from "../../util/fns";
import { SkillsEditor } from "./Skills.typing";
import { MobxContext } from "../../mobx";

const Skills = observer(({ className }: SkillsEditor) => {
  const store = React.useContext(MobxContext);
  const { id, groups, ...skillsEditorData } = store.resume.skills!;

  const formik = useFormik({
    initialValues: skillsEditorData,
    enableReinitialize: true,
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
    <div className={cn(className)}>
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
    </div>
  );
});

export default Skills;

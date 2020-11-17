import React from "react";
import { useFormik } from "formik";
import { observer } from "mobx-react-lite";

import SkillsGroup from "./SkillsGroup";
import Section from "./parts/Section";

import { skillsValidationSchema } from "../validationSchemas";
import { useFormikAutoSave } from "../../../util/hooks";
import { ResumeBubble } from "../../../bubbles/ResumeBubble";
import {
  getFieldProps,
  saveChangedValues,
  sortSkillsGroups,
} from "../../../util/fns";
import axios from "../../../util/axios";

const Skills = observer(() => {
  const resumeBubble = React.useContext(ResumeBubble);
  const { resume, updateSkills, addSkillsGroup, activeSection } = resumeBubble;
  const { full, split } = resume.meta!.content;
  const { id, groups, unlisted, order, ...skillsEditorData } = resume.skills!;

  const formik = useFormik({
    initialValues: skillsEditorData,
    onSubmit: (values) => {
      saveChangedValues(
        values,
        skillsEditorData,
        `/parts/skills/${id}`,
        updateSkills
      );
    },
    validationSchema: skillsValidationSchema,
  });
  useFormikAutoSave(formik);

  const addFn = () => {
    axios
      .post(`/parts/${id}/skills_group`)
      .then((res) => addSkillsGroup(res.data));
  };

  return (
    <Section
      key={`section-${full.order.indexOf("skills")}-${split.leftOrder.indexOf(
        "skills"
      )}-${split.rightOrder.indexOf("skills")}-${activeSection}`}
      identifier={"skills"}
      title={"Skills"}
      editableTitle={getFieldProps(formik, "title")}
      subtitle={"skills group"}
      addFn={addFn}
      purpose={`There are many variations of passages of Lorem Ipsum available, but 
    the majority have suffered alteration in some form, by injected humour, 
    or randomised words which.`}
    >
      {sortSkillsGroups(order, groups).map((gr, i, arr) => (
        <SkillsGroup
          hasSiblings={arr.length > 1}
          key={`skills_group_${gr.id}_editor`}
          isLast={arr.length - 1 === i}
          isFirst={i === 0}
          {...gr}
        />
      ))}
    </Section>
  );
});

export default Skills;

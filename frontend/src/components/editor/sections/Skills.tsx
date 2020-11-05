import React, { useState } from "react";
import { useFormik } from "formik";
import { observer } from "mobx-react-lite";

import Input from "./parts/Input";
import SkillsGroup from "./SkillsGroup";
import Section from "./parts/Section";
import Form from "./parts/Form";
import SectionHeader from "./parts/SectionHeader";

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
  const {
    id,
    groups,
    unlisted,
    order,
    ...skillsEditorData
  } = resumeBubble.resume.skills!;
  const [expanded, setExpanded] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: skillsEditorData,
    onSubmit: (values) => {
      saveChangedValues(
        values,
        skillsEditorData,
        `/parts/skills/${id}`,
        resumeBubble.updateSkills
      );
    },
    validationSchema: skillsValidationSchema,
  });
  useFormikAutoSave(formik);

  const addFn = () => {
    axios
      .post(`/parts/${id}/skills_group`)
      .then((res) => resumeBubble.addSkillsGroup(res.data));
  };

  return (
    <Section
      expanded={expanded}
      setExpanded={setExpanded}
      title={"Skills"}
      subtitle={"skills group"}
      addFn={addFn}
      purpose={`There are many variations of passages of Lorem Ipsum available, but 
    the majority have suffered alteration in some form, by injected humour, 
    or randomised words which.`}
    >
      {expanded && (
        <>
          <Form>
            <SectionHeader>
              <Input
                {...getFieldProps(formik, "title")}
                placeholder="Alternative skills title"
              />
            </SectionHeader>
          </Form>
          {sortSkillsGroups(order, groups).map((gr, i, arr) => (
            <SkillsGroup
              hasSiblings={arr.length > 1}
              key={`skills_group_${gr.id}_editor`}
              isLast={arr.length - 1 === i}
              isFirst={i === 0}
              {...gr}
            />
          ))}
        </>
      )}
    </Section>
  );
});

export default Skills;

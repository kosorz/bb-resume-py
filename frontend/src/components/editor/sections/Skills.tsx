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
import { getFieldProps, saveChangedValues } from "../../../util/fns";

const Skills = observer(() => {
  const resumeBubble = React.useContext(ResumeBubble);
  const {
    id,
    groups,
    deleted,
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

  return (
    <Section
      expanded={expanded}
      setExpanded={setExpanded}
      title={"Skills"}
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
          {groups
            .filter((gr) => !gr.deleted)
            .map((gr, i, arr) => (
              <SkillsGroup
                key={`skills_group_${i}`}
                isLast={arr.length - 1 === i}
                {...gr}
              />
            ))}
        </>
      )}
    </Section>
  );
});

export default Skills;

import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import { observer } from "mobx-react-lite";

import Input from "./parts/Input";
import ExperienceUnit from "./ExperienceUnit";
import Section from "./parts/Section";
import Form from "./parts/Form";

import {
  getFieldProps,
  saveChangedValues,
  sortExperienceUnits,
} from "../../../util/fns";
import { ResumeBubble } from "../../../bubbles/ResumeBubble";
import { useFormikAutoSave } from "../../../util/hooks";
import { experienceValidationSchema } from "../validationSchemas";
import SectionHeader from "./parts/SectionHeader";
import axios from "../../../util/axios";

const Experience = observer(() => {
  const resumeBubble = useContext(ResumeBubble);
  const { updateExperience, resume, addExperienceUnit } = resumeBubble;
  const {
    id,
    units,
    unlisted,
    order,
    ...experienceEditorData
  } = resume.experience!;
  const [expanded, setExpanded] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: experienceEditorData,
    onSubmit: (values) => {
      saveChangedValues(
        values,
        experienceEditorData,
        `/parts/experience/${id}`,
        updateExperience
      );
    },
    validationSchema: experienceValidationSchema,
  });
  useFormikAutoSave(formik);

  const addFn = () => {
    axios
      .post(`/parts/${id}/experience_unit`)
      .then((res) => addExperienceUnit(res.data));
  };

  return (
    <Section
      expanded={expanded}
      subtitle={"experience"}
      setExpanded={setExpanded}
      title={"Experience"}
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
                placeholder="Alternative experience title"
              />
            </SectionHeader>
          </Form>
          {sortExperienceUnits(order, units).map((u, i, arr) => (
            <ExperienceUnit
              hasSiblings={arr.length > 1}
              key={`experience_unit_${u.id}_editor`}
              isLast={arr.length - 1 === i}
              isFirst={i === 0}
              {...u}
            />
          ))}
        </>
      )}
    </Section>
  );
});

export default Experience;

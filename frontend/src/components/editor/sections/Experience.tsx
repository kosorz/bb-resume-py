import React, { useContext, useState, useEffect } from "react";
import { useFormik } from "formik";
import { observer } from "mobx-react-lite";

import ExperienceUnit from "./ExperienceUnit";
import Section from "./parts/Section";

import {
  getFieldProps,
  saveChangedValues,
  sortExperienceUnits,
} from "../../../util/fns";
import { ResumeBubble } from "../../../bubbles/ResumeBubble";
import { useFormikAutoSave } from "../../../util/hooks";
import { experienceValidationSchema } from "../validationSchemas";
import axios from "../../../util/axios";
import { SortableList } from "./parts/SortableList";

const Experience = observer(() => {
  const resumeBubble = useContext(ResumeBubble);
  const { updateExperience, resume, addExperienceUnit } = resumeBubble;
  const { full, split } = resume.meta!.content;
  const {
    id,
    units,
    unlisted,
    order,
    ...experienceEditorData
  } = resume.experience!;
  const [openedUnit, setOpenedUnit] = useState<number>();

  useEffect(() => {
    if (order.length === 1) {
      setOpenedUnit(order[0]);
    }
  }, [order]);

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

  const sortableUnits = sortExperienceUnits(order, units).map((u, i, arr) => {
    return {
      key: `experience_unit_${u.id}_editor`,
      value: (
        <ExperienceUnit
          i={i + 1}
          opened={u.id === openedUnit}
          setOpened={setOpenedUnit}
          hasSiblings={arr.length > 1}
          isLast={arr.length - 1 === i}
          isFirst={i === 0}
          {...u}
        />
      ),
    };
  });

  return (
    <Section
      key={`section-${full.order.indexOf(
        "experience"
      )}-${split.leftOrder.indexOf("experience")}-${split.rightOrder.indexOf(
        "experience"
      )}`}
      identifier={"experience"}
      editableTitle={getFieldProps(formik, "title")}
      subtitle={"experience"}
      title={"Experience"}
      addFn={addFn}
      purpose={`There are many variations of passages of Lorem Ipsum available, but 
    the majority have suffered alteration in some form, by injected humour, 
    or randomised words which.`}
    >
      <SortableList
        order={"experience-units"}
        items={sortableUnits}
        lockToContainerEdges={true}
        lockAxis={"y"}
        lockOffset={"0%"}
        pressDelay={100}
        useDragHandle={true}
      />
    </Section>
  );
});

export default Experience;

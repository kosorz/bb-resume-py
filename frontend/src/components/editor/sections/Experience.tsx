import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import { observer } from "mobx-react-lite";
import move from "array-move";

import ExperienceUnit from "./ExperienceUnit";
import Section from "./parts/Section";
import { SortableList } from "./parts/SortableList";

import {
  getFieldPropsMeta,
  saveChangedValues,
  sortExperienceUnits,
} from "../../../util/fns";
import { ResumeBubble } from "../../../bubbles/ResumeBubble";
import { useFormikAutoSave } from "../../../util/hooks";
import { experienceValidationSchema } from "../validationSchemas";
import axios from "../../../util/axios";

const Experience = observer(() => {
  const resumeBubble = useContext(ResumeBubble);
  const {
    resume,
    updateExperience,
    addExperienceUnit,
    setOpenSubSection,
    updateSubSectionsOrder,
  } = resumeBubble;
  const { full, split } = resume.meta!.content;
  const {
    id,
    units,
    unlisted,
    order,
    ...experienceEditorData
  } = resume.experience!;
  const [wobble, setWobble] = useState(false);

  const urlBase = `/parts/experience/${id}`;

  useEffect(() => {
    if (order.length === 1) {
      setOpenSubSection("experience", order[0]);
    }
  }, [order, setOpenSubSection]);

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
          wobble={wobble}
          hasSiblings={arr.length > 1}
          isLast={arr.length - 1 === i}
          isFirst={i === 0}
          {...u}
        />
      ),
    };
  });

  const onSortEnd = ({
    oldIndex,
    newIndex,
  }: {
    oldIndex: number;
    newIndex: number;
  }) => {
    setWobble(false);
    const newOrder = move(order, oldIndex, newIndex);
    if (newOrder.toString() !== order.toString()) {
      updateSubSectionsOrder("experience", newOrder);
      axios.post(`${urlBase}/reorganize`, newOrder).catch(() => {
        updateSubSectionsOrder("experience", order);
      });
    }
  };

  const onSortStart = () => setWobble(true);

  return (
    <Section
      key={`section-${full.order.indexOf(
        "experience"
      )}-${split.leftOrder.indexOf("experience")}-${split.rightOrder.indexOf(
        "experience"
      )}`}
      identifier={"experience"}
      editableTitle={getFieldPropsMeta(formik, "title")}
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
        onSortEnd={onSortEnd}
        lockAxis={"y"}
        lockOffset={"0%"}
        onSortStart={onSortStart}
        useDragHandle={true}
      />
    </Section>
  );
});

export default Experience;

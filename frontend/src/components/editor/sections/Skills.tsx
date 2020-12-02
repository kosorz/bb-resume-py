import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { observer } from "mobx-react-lite";
import move from "array-move";

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
import { SortableList } from "./parts/SortableList";

const Skills = observer(() => {
  const resumeBubble = React.useContext(ResumeBubble);
  const {
    resume,
    updateSkills,
    addSkillsGroup,
    setOpenSubSection,
    updateSubSectionsOrder,
  } = resumeBubble;
  const { full, split } = resume.meta!.content;
  const { id, groups, unlisted, order, ...skillsEditorData } = resume.skills!;
  const [wobble, setWobble] = useState(false);

  useEffect(() => {
    if (order.length === 1) {
      setOpenSubSection("skills", order[0]);
    }
  }, [order, setOpenSubSection]);

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

  const sortableGroups = sortSkillsGroups(order, groups).map((gr, i, arr) => {
    return {
      key: `skills_group_${gr.id}_editor`,
      value: (
        <SkillsGroup
          i={i + 1}
          wobble={wobble}
          hasSiblings={arr.length > 1}
          isLast={arr.length - 1 === i}
          isFirst={i === 0}
          {...gr}
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
    const movedOrder = move(order, oldIndex, newIndex);
    if (movedOrder.toString() !== order.toString()) {
      updateSubSectionsOrder("skills", move(order, oldIndex, newIndex));
    }
  };

  const onSortStart = () => {
    setWobble(true);
  };

  return (
    <Section
      key={`section-${full.order.indexOf("skills")}-${split.leftOrder.indexOf(
        "skills"
      )}-${split.rightOrder.indexOf("skills")}`}
      identifier={"skills"}
      title={"Skills"}
      editableTitle={getFieldProps(formik, "title")}
      subtitle={"skills group"}
      addFn={addFn}
      purpose={`There are many variations of passages of Lorem Ipsum available, but 
    the majority have suffered alteration in some form, by injected humour, 
    or randomised words which.`}
    >
      <SortableList
        order={"skill-groups"}
        items={sortableGroups}
        lockToContainerEdges={true}
        lockAxis={"y"}
        lockOffset={"0%"}
        onSortEnd={onSortEnd}
        onSortStart={onSortStart}
        useDragHandle={true}
      />
    </Section>
  );
});

export default Skills;

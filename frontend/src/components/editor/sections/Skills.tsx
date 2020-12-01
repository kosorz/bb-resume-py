import React, { useState, useEffect } from "react";
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
import { SortableList } from "./parts/SortableList";

const Skills = observer(() => {
  const resumeBubble = React.useContext(ResumeBubble);
  const { resume, updateSkills, addSkillsGroup } = resumeBubble;
  const { full, split } = resume.meta!.content;
  const { id, groups, unlisted, order, ...skillsEditorData } = resume.skills!;
  const [openedGroup, setOpenedGroup] = useState<number>();

  useEffect(() => {
    if (order.length === 1) {
      setOpenedGroup(order[0]);
    }
  }, [order]);

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
          opened={gr.id === openedGroup}
          setOpened={setOpenedGroup}
          hasSiblings={arr.length > 1}
          isLast={arr.length - 1 === i}
          isFirst={i === 0}
          {...gr}
        />
      ),
    };
  });

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
        order={"experience-units"}
        items={sortableGroups}
        lockToContainerEdges={true}
        lockAxis={"y"}
        lockOffset={"0%"}
        pressDelay={100}
        useDragHandle={true}
      />
    </Section>
  );
});

export default Skills;

import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { observer } from "mobx-react-lite";
import move from "array-move";
import { useMutation } from "react-query";
import { SortEndHandler } from "react-sortable-hoc";

import SkillsGroup from "./SkillsGroup";
import Section from "../../components/Section";
import { SortableList } from "../../components/SortableList";

import { ResumeBubble } from "../../../ResumeBubble";
import { useFormikAutoSave } from "../../../../../util/hooks";
import { skillsValidationSchema } from "../../../../../util/validationSchemas";
import {
  getFieldPropsMeta,
  saveChangedValues,
  sortSkillsGroups,
} from "../../../../../util/fns";
import axios from "../../../../../util/axios";

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

  const urlBase = `/parts/skills/${id}`;

  useEffect(() => {
    if (order.length === 1) {
      setOpenSubSection("skills", order[0]);
    }
  }, [order, setOpenSubSection]);

  const formik = useFormik({
    initialValues: skillsEditorData,
    onSubmit: (values) => {
      saveChangedValues(values, skillsEditorData, urlBase, updateSkills);
    },
    validationSchema: skillsValidationSchema,
  });
  useFormikAutoSave(formik);

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

  const addGroup = useMutation(() => axios.post(`/parts/${id}/skills_group`), {
    onSuccess: (res) => {
      addSkillsGroup(res.data);
    },
  });

  const endSorting = useMutation(
    ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) =>
      axios.post(`${urlBase}/reorganize`, move(order, oldIndex, newIndex)),
    {
      onMutate: ({
        oldIndex,
        newIndex,
      }: {
        oldIndex: number;
        newIndex: number;
      }) => {
        setWobble(false);
        updateSubSectionsOrder("skills", move(order, oldIndex, newIndex));
      },
      onError: (error) => {
        updateSubSectionsOrder("skills", order);
        console.log(`Something went wrong... ${error}`);
      },
    }
  );

  const onSortStart = () => setWobble(true);

  return (
    <Section
      key={`section-${full.order.indexOf("skills")}-${split.mainOrder.indexOf(
        "skills"
      )}-${split.secondaryOrder.indexOf("skills")}`}
      identifier={"skills"}
      title={"Skills"}
      editableTitle={getFieldPropsMeta(formik, "title")}
      subtitle={"skills group"}
      addFn={addGroup.mutate}
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
        onSortEnd={endSorting.mutate as SortEndHandler}
        onSortStart={onSortStart}
        useDragHandle={true}
      />
    </Section>
  );
});

export default Skills;

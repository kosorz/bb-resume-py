import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import { observer } from "mobx-react-lite";
import move from "array-move";
import { useMutation } from "react-query";
import { SortEndHandler } from "react-sortable-hoc";

import ExperienceUnit from "./ExperienceUnit";
import Section from "../../components/Section";
import { SortableList } from "../../components/SortableList";

import { ResumeBubble } from "../../../ResumeBubble";
import { useFormikAutoSave } from "../../../../../util/hooks";
import { experienceValidationSchema } from "../../../../../util/validationSchemas";
import {
  getFieldPropsMeta,
  saveChangedValues,
  sortExperienceUnits,
} from "../../../../../util/fns";
import axios from "../../../../../util/axios";

const Experience = observer(() => {
  const resumeBubble = useContext(ResumeBubble);
  const {
    resume,
    updateExperience,
    addExperienceUnit,
    setOpenSubSection,
    updateSubSectionsOrder,
  } = resumeBubble;
  const { full, split } = resume.meta.content;
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
        urlBase,
        updateExperience
      );
    },
    validationSchema: experienceValidationSchema,
  });
  useFormikAutoSave(formik);

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

  const addUnit = useMutation(
    () => axios.post(`/parts/${id}/experience_unit`),
    {
      onSuccess: (res) => {
        addExperienceUnit(res.data);
      },
    }
  );

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
        updateSubSectionsOrder("experience", move(order, oldIndex, newIndex));
      },
      onError: (error) => {
        updateSubSectionsOrder("experience", order);
        console.log(`Something went wrong... ${error}`);
      },
    }
  );

  const onSortStart = () => setWobble(true);

  return (
    <Section
      key={`section-${full.order.indexOf(
        "experience"
      )}-${split.mainOrder.indexOf(
        "experience"
      )}-${split.secondaryOrder.indexOf("experience")}`}
      identifier={"experience"}
      editableTitle={getFieldPropsMeta(formik, "title")}
      subtitle={"experience"}
      title={"Experience"}
      addFn={addUnit.mutate}
      purpose={`There are many variations of passages of Lorem Ipsum available, but 
    the majority have suffered alteration in some form, by injected humour, 
    or randomised words which.`}
    >
      <SortableList
        order={"experience-units"}
        items={sortableUnits}
        lockToContainerEdges={true}
        onSortEnd={endSorting.mutate as SortEndHandler}
        lockAxis={"y"}
        lockOffset={"0%"}
        onSortStart={onSortStart}
        useDragHandle={true}
      />
    </Section>
  );
});

export default Experience;

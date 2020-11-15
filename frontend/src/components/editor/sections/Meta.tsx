import React, { useContext } from "react";
import { observer } from "mobx-react-lite";

import Section from "./parts/Section";
import Form from "./parts/Form";
import ColorPicker from "./parts/ColorPicker";
import Select from "./parts/Select";
import Range from "./parts/Range";
import Settings from "./parts/Settings";

import { ResumeBubble } from "../../../bubbles/ResumeBubble";
import { useFormik } from "formik";
import {
  saveChangedValues,
  getFieldProps,
  getManualFieldProps,
} from "../../../util/fns";
import { useFormikAutoSave } from "../../../util/hooks";

const Meta = observer(() => {
  const resumeBubble = useContext(ResumeBubble);
  const { activeSection, resume, setResume } = resumeBubble;
  const { colors, paper, fontSize } = resume.meta!;
  const { id } = resume;

  const url = `/resumes/${id}`;

  const colorsFormik = useFormik({
    initialValues: colors,
    onSubmit: (values) =>
      saveChangedValues(values, colors, url, setResume, ["meta", "colors"]),
  });
  useFormikAutoSave(colorsFormik);

  const paperFormik = useFormik({
    initialValues: paper,
    onSubmit: (values) =>
      saveChangedValues(values, paper, url, setResume, ["meta", "paper"]),
  });
  useFormikAutoSave(paperFormik);

  const fontSizeFormik = useFormik({
    initialValues: fontSize,
    onSubmit: (values) =>
      saveChangedValues(values, fontSize, url, setResume, ["meta", "fontSize"]),
  });
  useFormikAutoSave(fontSizeFormik);

  return (
    <Section
      key={`meta-${activeSection}`}
      identifier={"meta"}
      title={"Appearance"}
      purpose={`There are many variations of passages of Lorem Ipsum available, but 
    the majority have suffered alteration in some form, by injected humour, 
    or randomised words which.`}
    >
      <Form>
        <Settings>
          <legend>Colors</legend>
          <ColorPicker {...getManualFieldProps(colorsFormik, "main")} />
          <ColorPicker {...getManualFieldProps(colorsFormik, "secondary")} />
        </Settings>
        <Settings>
          <legend>Page</legend>
          <Range
            min={40}
            max={60}
            step={10}
            {...getFieldProps(paperFormik, "space")}
          />
          <Select {...getFieldProps(paperFormik, "layout")}>
            <option value={"full"} label={"Single column"} />
            <option value={"split"} label={"Two columns"} />
          </Select>
        </Settings>
        <Settings>
          <legend>Font size</legend>
          <Range
            min={10}
            max={11}
            step={1}
            {...getFieldProps(fontSizeFormik, "small")}
          />
          <Range
            min={13}
            max={14}
            step={1}
            {...getFieldProps(fontSizeFormik, "main")}
          />
          <Range
            min={16}
            max={17}
            step={1}
            {...getFieldProps(fontSizeFormik, "medium")}
          />
          <Range
            min={20}
            max={24}
            step={2}
            {...getFieldProps(fontSizeFormik, "large")}
          />
          <Range
            min={34}
            max={42}
            step={4}
            {...getFieldProps(fontSizeFormik, "big")}
          />
        </Settings>
      </Form>
    </Section>
  );
});

export default Meta;

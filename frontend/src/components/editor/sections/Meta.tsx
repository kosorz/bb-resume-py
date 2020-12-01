import React, { useContext } from "react";
import { observer } from "mobx-react-lite";

import Section from "./parts/Section";
import Form from "./parts/Form";
import ColorPicker from "./parts/ColorPicker";
import Select from "./parts/Select";
import Range from "./parts/Range";
import Settings from "./parts/Settings";
import { Title } from "../Editor";

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
  const { resume, setResume } = resumeBubble;
  const { colors, paper, fontSize, content, ...rest } = resume.meta!;
  const { id } = resume;

  const url = `/resumes/${id}`;

  const colorsFormik = useFormik({
    initialValues: colors,
    onSubmit: (values) =>
      saveChangedValues(values, colors, url, setResume, ["meta", "colors"]),
  });
  useFormikAutoSave(colorsFormik, 0);

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
  useFormikAutoSave(fontSizeFormik, 0);

  const restFormik = useFormik({
    initialValues: rest,
    onSubmit: (values) =>
      saveChangedValues(values, rest, url, setResume, ["meta"]),
  });
  useFormikAutoSave(restFormik, 0);

  return (
    <>
      <Title>Settings</Title>
      <Section
        identifier={"meta"}
        title={"Appearance"}
        purpose={`There are many variations of passages of Lorem Ipsum available, but 
    the majority have suffered alteration in some form, by injected humour, 
    or randomised words which.`}
      >
        <Form>
          <Settings>
            <ColorPicker
              displayName={"Accents"}
              {...getManualFieldProps(colorsFormik, "main")}
            />
            <ColorPicker
              displayName={"Text"}
              {...getManualFieldProps(colorsFormik, "secondary")}
            />
            <Range
              displayName={"Spacing"}
              min={40}
              max={60}
              step={5}
              {...getFieldProps(paperFormik, "space")}
            />
            <Range
              displayName={"Your name"}
              min={34}
              max={42}
              step={1}
              {...getFieldProps(fontSizeFormik, "big")}
            />
            <Range
              displayName={"Headlines"}
              min={20}
              max={24}
              step={1}
              {...getFieldProps(fontSizeFormik, "large")}
            />
            <Range
              displayName={"Titles"}
              min={15}
              max={17}
              step={1}
              {...getFieldProps(fontSizeFormik, "medium")}
            />
            <Range
              displayName={"Content"}
              min={10}
              max={12}
              step={1}
              {...getFieldProps(fontSizeFormik, "small")}
            />
            <Select
              displayName={"Arrangement"}
              {...getFieldProps(paperFormik, "layout")}
            >
              <option value={"full"} label={"Single column"} />
              <option value={"split"} label={"Two columns"} />
            </Select>
            <Select
              displayName={"Font"}
              {...getFieldProps(restFormik, "fontFamily")}
            >
              <option value={"Rubik"} label={"Rubik"} />
              <option value={"Roboto"} label={"Roboto"} />
              <option value={"Exo"} label={"Exo"} />
              <option value={"Chivo"} label={"Chivo"} />
              <option value={"Montserrat"} label={"Montserrat"} />
              <option value={"Oswald"} label={"Oswald"} />
              <option value={"Lato"} label={"Lato"} />
              <option value={"Bitter"} label={"Bitter"} />
            </Select>
            <Select
              displayName={"Background"}
              {...getFieldProps(restFormik, "background")}
            >
              <option value={""} label={"None"} />
              <option value={"Crossings"} label={"Crossings"} />
              <option value={"Hectagons"} label={"Hectagons"} />
              <option value={"Net"} label={"Net"} />
              <option value={"Waves"} label={"Waves"} />
              <option value={"Triangles"} label={"Triangles"} />
              <option value={"Wood"} label={"Wood"} />
              <option value={"X-parts"} label={"X-parts"} />
            </Select>
          </Settings>
        </Form>
      </Section>
    </>
  );
});

export default Meta;

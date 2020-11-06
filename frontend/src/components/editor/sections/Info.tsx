import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import { observer } from "mobx-react-lite";

import Checkbox from "./parts/Checkbox";
import Input from "./parts/Input";
import Section from "./parts/Section";
import Form from "./parts/Form";
import Settings from "./parts/Settings";
import Values from "./parts/Values";

import { ResumeBubble } from "../../../bubbles/ResumeBubble";
import { getFieldProps, saveChangedValues } from "../../../util/fns";
import { useFormikAutoSave } from "../../../util/hooks";
import { infoValidationSchema } from "../validationSchemas";

const Info = observer(() => {
  const resumeBubble = useContext(ResumeBubble);
  const { resume, updateInfo } = resumeBubble;
  const { resume_id, ...infoEditorData } = resume.info!;
  const [expanded, setExpanded] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: infoEditorData,
    onSubmit: (values) =>
      saveChangedValues(
        values,
        infoEditorData,
        `/parts/${resume_id}/info`,
        updateInfo
      ),
    validationSchema: infoValidationSchema,
  });
  useFormikAutoSave(formik);

  return (
    <Section
      movable={false}
      expanded={expanded}
      setExpanded={setExpanded}
      title={"Basic information"}
      purpose={`There are many variations of passages of Lorem Ipsum available, but 
    the majority have suffered alteration in some form, by injected humour, 
    or randomised words which.`}
    >
      {expanded && (
        <Form>
          <Values>
            <legend>About you</legend>
            <Input {...getFieldProps(formik, "name")} placeholder="Name" />
            <Input {...getFieldProps(formik, "role")} placeholder="Role" />
            <Input
              {...getFieldProps(formik, "location")}
              placeholder="Location"
            />
            <Input {...getFieldProps(formik, "phone")} placeholder="Phone" />
            <Input {...getFieldProps(formik, "email")} placeholder="Email" />
            <Input {...getFieldProps(formik, "link")} placeholder="Link" />
          </Values>
          <Settings>
            <legend>Settings</legend>
            <Checkbox {...getFieldProps(formik, "phone_enabled")} />
            <Checkbox {...getFieldProps(formik, "link_enabled")} />
            <Checkbox {...getFieldProps(formik, "email_enabled")} />
            <Checkbox {...getFieldProps(formik, "location_enabled")} />
            <Checkbox {...getFieldProps(formik, "role_enabled")} />
          </Settings>
        </Form>
      )}
    </Section>
  );
});

export default Info;

import React, { useContext } from "react";
import { useFormik } from "formik";
import { observer } from "mobx-react-lite";

import Checkbox from "./parts/Checkbox";
import Input from "./parts/Input";
import Section from "./parts/Section";

import { ResumeBubble } from "../../../bubbles/ResumeBubble";
import { getFieldProps, saveChangedValues } from "../../../util/fns";
import { useFormikAutoSave } from "../../../util/hooks";
import { infoValidationSchema } from "../validationSchemas";

const Info = observer(() => {
  const resumeBubble = useContext(ResumeBubble);
  const { resume_id, ...infoEditorData } = resumeBubble.resume.info!;

  const formik = useFormik({
    initialValues: infoEditorData,
    onSubmit: (values) =>
      saveChangedValues(
        values,
        infoEditorData,
        `/parts/${resume_id}/info`,
        resumeBubble.updateInfo
      ),
    validationSchema: infoValidationSchema,
  });
  useFormikAutoSave(formik);

  const {
    phone_enabled,
    link_enabled,
    email_enabled,
    location_enabled,
    role_enabled,
  } = formik.values;

  return (
    <Section>
      <form>
        <Checkbox {...getFieldProps(formik, "phone_enabled")} />
        <Checkbox {...getFieldProps(formik, "link_enabled")} />
        <Checkbox {...getFieldProps(formik, "email_enabled")} />
        <Checkbox {...getFieldProps(formik, "location_enabled")} />
        <Checkbox {...getFieldProps(formik, "role_enabled")} />
        <Input {...getFieldProps(formik, "name")} placeholder="Name" />
        {phone_enabled && (
          <Input {...getFieldProps(formik, "phone")} placeholder="Phone" />
        )}
        {link_enabled && (
          <Input {...getFieldProps(formik, "link")} placeholder="Link" />
        )}
        {email_enabled && (
          <Input {...getFieldProps(formik, "email")} placeholder="Email" />
        )}
        {location_enabled && (
          <Input
            {...getFieldProps(formik, "location")}
            placeholder="Location"
          />
        )}
        {role_enabled && (
          <Input {...getFieldProps(formik, "role")} placeholder="Role" />
        )}
      </form>
    </Section>
  );
});

export default Info;

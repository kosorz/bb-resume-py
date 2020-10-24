import React, { useContext } from "react";
import cn from "classnames";
import { useFormik } from "formik";
import { observer } from "mobx-react-lite";

import Checkbox from "../Checkbox/Checkbox";
import Input from "../Input/Input";

import { getFieldProps } from "../../util/fns";
import axios from "../../util/axios";

import { InfoEditor } from "./Info.typing";
import { ResumeBubble } from "../../Bubbles/ResumeBubble";

const Info = observer(({ className }: InfoEditor) => {
  const resumeBubble = useContext(ResumeBubble);
  const { resume_id, ...infoEditorData } = resumeBubble.resume.info;

  const formik = useFormik({
    initialValues: infoEditorData,
    enableReinitialize: true,
    onSubmit: (values) =>
      axios
        .patch(`/parts/${resume_id}/info`, values)
        .then((res) => {
          resumeBubble.updateInfo(res.data);
        })
        .catch((err) => console.log(err)),
  });

  const {
    phone_enabled,
    link_enabled,
    email_enabled,
    location_enabled,
    role_enabled,
  } = formik.values;

  return (
    <section className={cn(className)}>
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
        <div onClick={() => formik.submitForm()}>Save Info</div>
      </form>
    </section>
  );
});

export default Info;

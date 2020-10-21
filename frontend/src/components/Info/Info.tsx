import React, { useContext } from "react";
import cn from "classnames";
import { useFormik } from "formik";
import { observer } from "mobx-react-lite";

import Checkbox from "../Checkbox/Checkbox";
import Input from "../Input/Input";

import { getFieldProps } from "../../util/fns";
import axios from "../../util/axios";

import { InfoEditor } from "./Info.typing";
import { MobxContext } from "../../mobx";

const Info = observer(({ className }: InfoEditor) => {
  const store = useContext(MobxContext);
  const { resume_id, ...infoEditorData } = store.resume.info;

  const formik = useFormik({
    initialValues: infoEditorData,
    enableReinitialize: true,
    onSubmit: (values) =>
      axios
        .patch(`/parts/${resume_id}/info`, values)
        .then((res) => {
          store.updateInfo(res.data);
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
    <div className={cn(className)}>
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
        <button onClick={() => formik.submitForm()} type="button">
          Save Info
        </button>
      </form>
    </div>
  );
});

export default Info;

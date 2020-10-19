import * as React from "react";
import { useFormik } from "formik";
import cn from "classnames";

import Checkbox from "../Checkbox/Checkbox";
import Input from "../Input/Input";

import { getFieldProps } from "../../util/fns";
import axios from "../../util/axios";

import { InfoEditor } from "./Info.typing";

const Info = ({
  name,
  resume_id,
  phone,
  link,
  email,
  location,
  role,
  phone_enabled,
  link_enabled,
  email_enabled,
  location_enabled,
  role_enabled,
  className,
}: InfoEditor) => {
  const formik = useFormik({
    initialValues: {
      name,
      phone,
      link,
      email,
      location,
      role,
      phone_enabled,
      link_enabled,
      email_enabled,
      location_enabled,
      role_enabled,
    },
    enableReinitialize: true,
    onSubmit: (values) => axios.patch(`/parts/${resume_id}/info`, values),
  });

  const { values } = formik;

  return (
    <div className={cn(className)}>
      <form>
        <Checkbox {...getFieldProps(formik, "phone_enabled")} />
        <Checkbox {...getFieldProps(formik, "link_enabled")} />
        <Checkbox {...getFieldProps(formik, "email_enabled")} />
        <Checkbox {...getFieldProps(formik, "location_enabled")} />
        <Checkbox {...getFieldProps(formik, "role_enabled")} />
        <Input {...getFieldProps(formik, "name")} placeholder="Name" />
        {values.phone_enabled && (
          <Input {...getFieldProps(formik, "phone")} placeholder="Phone" />
        )}
        {values.link_enabled && (
          <Input {...getFieldProps(formik, "link")} placeholder="Link" />
        )}
        {values.email_enabled && (
          <Input {...getFieldProps(formik, "email")} placeholder="Email" />
        )}
        {values.location_enabled && (
          <Input
            {...getFieldProps(formik, "location")}
            placeholder="Location"
          />
        )}
        {values.role_enabled && (
          <Input {...getFieldProps(formik, "role")} placeholder="Role" />
        )}
        <button onClick={() => formik.submitForm()} type="button">
          Save Info
        </button>
      </form>
    </div>
  );
};

export default Info;

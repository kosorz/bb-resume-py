import React, { useContext, useEffect } from "react";
import { useFormik } from "formik";
import { observer } from "mobx-react-lite";

import Checkbox from "./parts/Checkbox";
import Input from "./parts/Input";

import { getFieldProps } from "../../../util/fns";
import axios from "../../../util/axios";

import { ResumeBubble } from "../../../bubbles/ResumeBubble";
import { useDebounce } from "../../../util/hooks";

const Info = observer(() => {
  const resumeBubble = useContext(ResumeBubble);
  const { resume_id, ...infoEditorData } = resumeBubble.resume.info!;

  const formik = useFormik({
    initialValues: infoEditorData,
    onSubmit: (values) =>
      axios
        .patch(`/parts/${resume_id}/info`, values)
        .then((res) => {
          resumeBubble.updateInfo(res.data);
        })
        .catch((err) => console.log(err)),
  });

  const debouncedValues = useDebounce(formik.values, 1000);

  useEffect(() => {
    resumeBubble.updateInfo({ ...debouncedValues, resume_id });
  }, [debouncedValues, resumeBubble, resume_id]);

  const {
    phone_enabled,
    link_enabled,
    email_enabled,
    location_enabled,
    role_enabled,
  } = formik.values;

  return (
    <section>
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
        <button onClick={() => formik.submitForm()} type={"button"}>
          Save Info
        </button>
      </form>
    </section>
  );
});

export default Info;

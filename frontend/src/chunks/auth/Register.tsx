import React, { useState } from "react";
import { useFormik } from "formik";

import Input from "../../components/formik/Input";
import Button from "../../components/Button";
import Form, { Link } from "./components/Form";

import { register } from "../../util/auth";
import { registerValidationSchema } from "../../util/validationSchemas";
import { getFieldPropsMeta } from "../../util/fns";

const Register = () => {
  const [baseError, setBaseError] = useState("");

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      password_confirm: "",
    },
    onSubmit: ({ username, password, password_confirm }) => {
      register(username, password, password_confirm).catch(() => {
        formik.resetForm();
        formik.validateForm();
        setBaseError("Account creation failed, please try again");
      });
    },
    validateOnMount: true,
    validationSchema: registerValidationSchema,
  });

  return (
    <Form
      links={<Link to={"/login"}>Already have an account?</Link>}
      baseError={baseError}
      inputs={
        <>
          <Input
            withSpace={false}
            displayName={"Email address"}
            placeholder={"Enter your email address"}
            onFocus={() => setBaseError("")}
            {...getFieldPropsMeta(formik, "username")}
          />
          <Input
            withSpace={false}
            displayName={"Password"}
            placeholder={"Enter your password"}
            type={"password"}
            onFocus={() => setBaseError("")}
            {...getFieldPropsMeta(formik, "password")}
          />
          <Input
            withSpace={false}
            displayName={"Password confirmation"}
            placeholder={"Enter your password again"}
            type={"password"}
            onFocus={() => setBaseError("")}
            {...getFieldPropsMeta(formik, "password_confirm")}
          />
        </>
      }
      button={
        <Button disabled={!formik.isValid} onClick={() => formik.submitForm()}>
          Create an account
        </Button>
      }
    />
  );
};

export default Register;

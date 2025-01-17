import React, { useState } from "react";
import { useFormik } from "formik";

import Input from "../../components/formik/Input";
import Button from "../../components/Button";
import Form, { Link } from "./components/Form";

import { login } from "../../util/auth";
import { loginValidationSchema } from "../../util/validationSchemas";
import { getFieldPropsMeta } from "../../util/fns";

const Login = () => {
  const [baseError, setBaseError] = useState("");

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: ({ username, password }) => {
      login(username, password).catch((err) => {
        if (err.response.status === 401) {
          formik.resetForm();
          formik.validateForm();
          setBaseError("Invalid email or password, please try again");
        }
      });
    },
    validateOnMount: true,
    validationSchema: loginValidationSchema,
  });

  return (
    <Form
      links={
        <>
          <Link to={"/recover_password"}>Forgot your password?</Link>
          <Link to={"/register"}>Don't have an account?</Link>
        </>
      }
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
        </>
      }
      button={
        <Button disabled={!formik.isValid} onClick={() => formik.submitForm()}>
          Log in
        </Button>
      }
    />
  );
};

export default Login;

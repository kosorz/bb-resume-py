import React, { ReactElement } from "react";
import { FieldInputProps, FieldMetaProps } from "formik";

import FormikError from "./Error";
import FormikLabel from "./Label";

const FormikField = (
  props: {
    children: ReactElement | ReactElement[];
    inputFirst?: boolean;
  } & Pick<FieldInputProps<any>, "name"> &
    Pick<FieldMetaProps<any>, "touched" | "error">
) => {
  const { name, touched, error, children, inputFirst } = props;

  return (
    <>
      {inputFirst && children}
      <FormikLabel name={name} />
      {!inputFirst && children}
      <FormikError touched={touched} error={error} />
    </>
  );
};

export default FormikField;

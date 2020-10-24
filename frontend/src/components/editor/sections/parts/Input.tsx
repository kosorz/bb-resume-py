import * as React from "react";
import { FieldInputProps, FieldMetaProps } from "formik";

const Input = (
  props: { placeholder: string } & FieldInputProps<any> & FieldMetaProps<any>
) => {
  const {
    initialTouched,
    initialError,
    initialValue,
    touched,
    error,
    ...rest
  } = props;
  return <input {...rest} />;
};

export default Input;

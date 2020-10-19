import * as React from "react";
import { FieldInputProps, FieldMetaProps } from "formik";

import style from "./Input.module.scss";

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
  return <input className={style["input"]} {...rest} />;
};

export default Input;

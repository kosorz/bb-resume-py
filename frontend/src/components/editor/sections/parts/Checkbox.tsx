import * as React from "react";
import { FieldInputProps, FieldMetaProps } from "formik";

const Checkbox = (props: FieldInputProps<any> & FieldMetaProps<any>) => {
  const {
    initialTouched,
    initialError,
    initialValue,
    touched,
    error,
    ...rest
  } = props;
  return <input type="checkbox" {...rest} checked={!!props.value} />;
};

export default Checkbox;

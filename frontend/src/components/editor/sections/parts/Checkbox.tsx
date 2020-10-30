import * as React from "react";
import { FieldInputProps, FieldMetaProps } from "formik";

import FormikField from "./Field";

const Checkbox = (props: FieldInputProps<any> & FieldMetaProps<any>) => {
  const {
    initialTouched,
    initialError,
    initialValue,
    touched,
    error,
    ...rest
  } = props;
  return (
    <>
      <FormikField
        inputFirst={true}
        name={rest.name}
        touched={touched}
        error={error}
      >
        <input type="checkbox" {...rest} checked={!!props.value} />
      </FormikField>
    </>
  );
};

export default Checkbox;

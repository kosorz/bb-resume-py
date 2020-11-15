import * as React from "react";
import { FieldInputProps, FieldMetaProps } from "formik";

import FormikField from "./Field";

const Checkbox = ({
  initialTouched,
  initialError,
  initialValue,
  touched,
  error,
  ...rest
}: FieldInputProps<any> & FieldMetaProps<any>) => {
  return (
    <>
      <FormikField
        inputFirst={true}
        name={rest.name}
        touched={touched}
        error={error}
      >
        <input type="checkbox" {...rest} checked={!!rest.value} />
      </FormikField>
    </>
  );
};

export default Checkbox;

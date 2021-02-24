import React, { ReactNode } from "react";
import { FieldInputProps, FieldMetaProps } from "formik";
import Field from "./Field";
import { FormikArea } from "./Area";

const CollectionArea = ({
  initialTouched,
  initialError,
  initialValue,
  touched,
  error,
  toggle,
  onChange,
  withSpace = true,
  ...rest
}: {
  placeholder: string;
  toggle?: ReactNode;
  withSpace?: boolean;
} & FieldInputProps<any> &
  FieldMetaProps<any>) => (
  <Field name={rest.name} touched={touched} error={error}>
    <FormikArea
      withSpace={withSpace}
      withToggle={typeof toggle !== "undefined"}
      rows={4}
      onChange={(e) => {
        onChange({
          ...e,
          target: {
            ...e.target,
            name: rest.name,
            value: e.target.value.split(","),
          },
        });
      }}
      {...rest}
    />
    {toggle}
  </Field>
);

export default CollectionArea;

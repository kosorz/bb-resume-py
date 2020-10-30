import React from "react";
import { FieldInputProps, FieldMetaProps } from "formik";
import styled from "styled-components";

import FormikField from "./Field";

const Area = styled.textarea`
  width: 100%;
  resize: none;
  box-sizing: border-box;
`;

const FormikArea = ({
  initialTouched,
  initialError,
  initialValue,
  touched,
  error,
  ...rest
}: { placeholder: string } & FieldInputProps<any> & FieldMetaProps<any>) => (
  <FormikField name={rest.name} touched={touched} error={error}>
    <Area rows={3} {...rest} />
  </FormikField>
);

export default FormikArea;

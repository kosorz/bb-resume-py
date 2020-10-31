import React from "react";
import { FieldInputProps, FieldMetaProps } from "formik";
import styled from "styled-components";

import FormikField from "./Field";

const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spaceSmall / 2 + "px"};
`;

const FormikInput = (
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

  return (
    <>
      <FormikField name={rest.name} touched={touched} error={error}>
        <Input {...rest} />
      </FormikField>
    </>
  );
};

export default FormikInput;

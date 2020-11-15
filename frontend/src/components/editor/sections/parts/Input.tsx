import React from "react";
import { FieldInputProps, FieldMetaProps } from "formik";
import styled from "styled-components";

import FormikField from "./Field";

const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spaceSmall / 2 + "px"};
  border-radius: ${({ theme }) => theme.spaceSmall / 4 + "px"};
  margin-bottom: ${({ theme }) => theme.spaceSmall / 2 + "px"};
`;

const FormikInput = ({
  initialTouched,
  initialError,
  initialValue,
  touched,
  error,
  ...rest
}: { placeholder?: string } & FieldInputProps<any> & FieldMetaProps<any>) => {
  return (
    <>
      <FormikField name={rest.name} touched={touched} error={error}>
        <Input {...rest} />
      </FormikField>
    </>
  );
};

export default FormikInput;

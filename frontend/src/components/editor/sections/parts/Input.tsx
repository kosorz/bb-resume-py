import React from "react";
import { FieldInputProps, FieldMetaProps } from "formik";
import styled from "styled-components";

import FormikField from "./Field";

const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spaceSmall / 2 + "px"};
  border-radius: ${({ theme }) => theme.spaceSmall / 2 + "px"};
  margin: ${({ theme }) => theme.spaceSmall / 2 + "px"} 0;
  color: ${({ theme }) => theme.main};
`;

const FormikInput = ({
  displayName,
  initialTouched,
  initialError,
  initialValue,
  touched,
  error,
  ...rest
}: { placeholder?: string; displayName?: string } & FieldInputProps<any> &
  FieldMetaProps<any>) => {
  return (
    <>
      <FormikField
        name={displayName || rest.name}
        touched={touched}
        error={error}
      >
        <Input {...rest} />
      </FormikField>
    </>
  );
};

export default FormikInput;

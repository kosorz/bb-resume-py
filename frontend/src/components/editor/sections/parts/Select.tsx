import React, { ReactNode } from "react";
import { FieldInputProps, FieldMetaProps } from "formik";
import styled from "styled-components";

import FormikField from "./Field";

const Select = styled.select`
  width: 100%;
  padding: ${({ theme }) => theme.spaceSmall / 2 + "px"};
  border-radius: ${({ theme }) => theme.spaceSmall / 4 + "px"};
`;

const FormikSelect = (
  props: {
    children: ReactNode | ReactNode[];
  } & FieldInputProps<any> &
    FieldMetaProps<any>
) => {
  const {
    initialTouched,
    initialError,
    initialValue,
    touched,
    error,
    children,
    ...rest
  } = props;

  return (
    <>
      <FormikField name={rest.name} touched={touched} error={error}>
        <Select {...rest}>{children}</Select>
      </FormikField>
    </>
  );
};

export default FormikSelect;

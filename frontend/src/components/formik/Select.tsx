import React, { ReactNode } from "react";
import { FieldInputProps, FieldMetaProps } from "formik";
import styled from "styled-components";

import Field from "./Field";

const FormikSelect = styled.select`
  width: 100%;
  padding: ${({ theme }) => theme.spaceSmall / 2 + "px"};
  border-radius: ${({ theme }) => theme.spaceSmall / 4 + "px"};
  margin: ${({ theme }) => theme.spaceSmall / 2 + "px"} 0;
`;

const Select = ({
  displayName,
  initialTouched,
  initialError,
  initialValue,
  touched,
  error,
  children,
  ...rest
}: {
  displayName?: string;
  children: ReactNode | ReactNode[];
} & FieldInputProps<any> &
  FieldMetaProps<any>) => {
  return (
    <Field name={displayName || rest.name} touched={touched} error={error}>
      <FormikSelect {...rest}>{children}</FormikSelect>
    </Field>
  );
};

export default Select;

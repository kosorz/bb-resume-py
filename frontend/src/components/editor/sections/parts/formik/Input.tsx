import React, { ReactNode } from "react";
import { FieldInputProps, FieldMetaProps } from "formik";
import styled from "styled-components";

import FormikField from "./Field";
import { ThemeShape } from "../../../../../typings/Theme.typing";

const Input = styled.input`
  flex: 100%;
  padding: ${({ theme }) => theme.spaceSmall / 2 + "px"};
  border-radius: ${({ theme }) => theme.spaceSmall / 2 + "px"};
  margin: ${({ theme }) => theme.spaceSmall / 4 + "px"} 0;
  color: ${({ theme }) => theme.main};
  margin-right: ${({
    withToggle,
    withSpace,
    theme,
  }: {
    withToggle: boolean;
    theme: ThemeShape;
    withSpace: boolean;
  }) =>
    (withToggle ? theme.spaceSmall : withSpace ? 2 * theme.spaceBig : 0) +
    "px"};

  &:disabled {
    cursor: not-allowed;
  }
`;

const FormikInput = ({
  displayName,
  initialTouched,
  initialError,
  initialValue,
  touched,
  error,
  toggle,
  withSpace = true,
  ...rest
}: {
  placeholder?: string;
  displayName?: string;
  toggle?: ReactNode;
  withSpace?: boolean;
} & FieldInputProps<any> &
  FieldMetaProps<any>) => {
  return (
    <FormikField
      name={displayName || rest.name}
      touched={touched}
      error={error}
    >
      <Input
        withToggle={typeof toggle !== "undefined"}
        withSpace={withSpace}
        {...rest}
      />
      {toggle}
    </FormikField>
  );
};

export default FormikInput;

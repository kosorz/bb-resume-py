import React, { ReactNode } from "react";
import { FieldInputProps, FieldMetaProps } from "formik";
import styled from "styled-components";

import FormikField from "./Field";

import { ThemeShape } from "../../../../../typings/Theme.typing";

const Area = styled.textarea`
  flex: 100%;
  resize: none;
  box-sizing: border-box;
  margin: ${({ theme }) => theme.spaceSmall / 2 + "px"} 0;
  padding: ${({ theme }) => theme.spaceSmall / 2 + "px"};
  border-radius: ${({ theme }) => theme.spaceSmall / 4 + "px"};
  margin-right: ${({
    withToggle,
    theme,
    withSpace,
  }: {
    withToggle: boolean;
    withSpace: boolean;
    theme: ThemeShape;
  }) =>
    (withToggle ? theme.spaceSmall : withSpace ? 2 * theme.spaceBig : 0) +
    "px"};
`;

const FormikArea = ({
  initialTouched,
  initialError,
  initialValue,
  touched,
  error,
  toggle,
  withSpace = true,
  ...rest
}: {
  placeholder: string;
  toggle?: ReactNode;
  withSpace?: boolean;
} & FieldInputProps<any> &
  FieldMetaProps<any>) => (
  <FormikField name={rest.name} touched={touched} error={error}>
    <Area
      withSpace={withSpace}
      withToggle={typeof toggle !== "undefined"}
      rows={4}
      {...rest}
    />
    {toggle}
  </FormikField>
);

export default FormikArea;

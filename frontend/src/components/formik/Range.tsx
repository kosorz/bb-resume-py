import React from "react";
import { FieldInputProps, FieldMetaProps } from "formik";
import styled from "styled-components";

import Field from "./Field";

const FormikRange = styled.input`
  margin: 0;
  margin-top: ${({ theme }) => theme.spaceSmall / 2 + "px"};
  width: 100%;
`;

const Range = ({
  displayName,
  initialTouched,
  initialError,
  initialValue,
  touched,
  error,
  ...rest
}: {
  min: number;
  max: number;
  step: number;
  displayName?: string;
} & FieldInputProps<any> &
  FieldMetaProps<any>) => {
  return (
    <>
      <Field name={displayName || rest.name} touched={touched} error={error}>
        <FormikRange {...rest} type={"range"} />
      </Field>
    </>
  );
};

export default Range;

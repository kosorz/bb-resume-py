import React from "react";
import { FieldInputProps, FieldMetaProps } from "formik";
import styled from "styled-components";

import Field from "./Field";

const Range = styled.input`
  margin: 0;
  margin-top: ${({ theme }) => theme.spaceSmall / 2 + "px"};
  width: 100%;
`;

const FormikRange = ({
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
        <Range {...rest} type={"range"} />
      </Field>
    </>
  );
};

export default FormikRange;

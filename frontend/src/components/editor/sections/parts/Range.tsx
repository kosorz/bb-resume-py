import React from "react";
import { FieldInputProps, FieldMetaProps } from "formik";
import styled from "styled-components";

import FormikField from "./Field";

const Range = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spaceSmall / 2 + "px"};
  border-radius: ${({ theme }) => theme.spaceSmall / 4 + "px"};
`;

const FormikRange = (
  props: {
    min: number;
    max: number;
    step: number;
  } & FieldInputProps<any> &
    FieldMetaProps<any>
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
        <Range {...rest} type={"range"} />
      </FormikField>
    </>
  );
};

export default FormikRange;

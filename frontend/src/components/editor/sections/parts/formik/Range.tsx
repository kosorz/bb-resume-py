import React from "react";
import { FieldInputProps, FieldMetaProps } from "formik";
import styled from "styled-components";

import FormikField from "./Field";

const Range = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spaceSmall / 2 + "px"};
  border-radius: ${({ theme }) => theme.spaceSmall / 4 + "px"};
  margin: ${({ theme }) => theme.spaceSmall / 2 + "px"} 0;
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
      <FormikField
        name={displayName || rest.name}
        touched={touched}
        error={error}
      >
        <Range {...rest} type={"range"} />
      </FormikField>
    </>
  );
};

export default FormikRange;

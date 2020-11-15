import React, { ReactElement } from "react";
import { FieldInputProps, FieldMetaProps } from "formik";

import FormikError from "./Error";
import FormikLabel from "./Label";
import styled from "styled-components";

const InputFirstHolder = styled.div`
  display: flex;
  flex-wrap: nowrap;
  flex: 100%;
`;

const FormikField = ({
  name,
  touched,
  error,
  children,
  inputFirst,
}: {
  children: ReactElement | ReactElement[];
  inputFirst?: boolean;
} & Pick<FieldInputProps<any>, "name"> &
  Pick<FieldMetaProps<any>, "touched" | "error">) => {
  return (
    <>
      {inputFirst ? (
        <InputFirstHolder>
          {children}&nbsp;
          <FormikLabel name={name} />
        </InputFirstHolder>
      ) : (
        <>
          <FormikLabel name={name} />
          {children}
        </>
      )}
      <FormikError touched={touched} error={error} />
    </>
  );
};

export default FormikField;

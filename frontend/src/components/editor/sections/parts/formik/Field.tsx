import React, { ReactNode } from "react";
import { FieldInputProps, FieldMetaProps } from "formik";

import FormikError from "./Error";
import FormikLabel from "./Label";
import styled from "styled-components";

const Children = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  flex: 100%;
`;

const FormikField = ({
  name,
  touched,
  error,
  children,
}: {
  children: ReactNode | ReactNode[];
  toggle?: ReactNode;
} & Pick<FieldInputProps<any>, "name"> &
  Pick<FieldMetaProps<any>, "touched" | "error">) => {
  return (
    <>
      <FormikLabel name={name} />
      <Children>{children}</Children>
      {error && <FormikError touched={touched} error={error} />}
    </>
  );
};

export default FormikField;

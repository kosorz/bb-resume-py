import * as React from "react";
import { FieldMetaProps } from "formik";
import styled from "styled-components";
import { capitalize } from "../../../../../util/fns";

const Error = styled.span`
  color: ${({ theme }) => theme.red};
  font-size: ${({ theme }) => theme.smallFont};
  margin-bottom: ${({ theme }) => theme.spaceSmall + "px"};
`;

const FormikError = ({
  touched,
  error,
}: Pick<FieldMetaProps<any>, "error" | "touched">) => {
  return <Error>{touched && error && capitalize(error.concat("."))}</Error>;
};

export default FormikError;

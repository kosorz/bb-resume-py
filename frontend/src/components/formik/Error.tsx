import * as React from "react";
import { FieldMetaProps } from "formik";
import styled from "styled-components";
import { Collapse } from "react-collapse";

import { capitalize } from "../../util/fns";

const FormikError = styled.span`
  color: ${({ theme }) => theme.red};
  font-size: ${({ theme }) => theme.smallFont};
`;

const Error = ({
  touched,
  error,
  bare,
}: Pick<FieldMetaProps<any>, "error" | "touched"> & { bare?: boolean }) => {
  const content = (
    <FormikError>
      {touched && error && capitalize(error.concat("."))}
    </FormikError>
  );

  return bare ? content : <Collapse isOpened={!!error}>{content}</Collapse>;
};

export default Error;

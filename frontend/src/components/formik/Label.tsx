import React from "react";
import { FieldInputProps } from "formik";
import styled from "styled-components";
import { capitalize } from "../../util/fns";

const FormikLabel = styled.label`
  color: ${({ theme }) => theme.activeMain};
  margin-top: ${({ theme }) => theme.spaceSmall + "px"};
  margin-bottom: ${({ theme }) => theme.spaceSmall / 2 + "px"};
  flex: 100%;
`;

const Label = ({
  name,
  className,
}: Pick<FieldInputProps<any>, "name"> & {
  className?: string;
}) => {
  return (
    <FormikLabel className={className}>
      {capitalize(name.replace(/_/g, "\xa0"))}
    </FormikLabel>
  );
};

export default Label;

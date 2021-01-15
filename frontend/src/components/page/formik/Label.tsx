import React from "react";
import { FieldInputProps } from "formik";
import styled from "styled-components";
import { capitalize } from "../../../util/fns";

const Label = styled.label`
  font-size: ${({ theme }) => theme.smallFont};
  color: ${({ theme }) => theme.activeMain};
  margin-top: ${({ theme }) => theme.spaceSmall + "px"};
  margin-bottom: ${({ theme }) => theme.spaceSmall / 2 + "px"};
  flex: 100%;
  text-transform: uppercase;
`;

const FormikLabel = ({
  name,
  className,
}: Pick<FieldInputProps<any>, "name"> & {
  className?: string;
}) => {
  return (
    <Label className={className}>
      {capitalize(name.replace(/_/g, "\xa0"))}
    </Label>
  );
};

export default FormikLabel;

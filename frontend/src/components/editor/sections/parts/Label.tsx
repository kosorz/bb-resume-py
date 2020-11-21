import React from "react";
import { FieldInputProps } from "formik";
import styled from "styled-components";
import { capitalize } from "../../../../util/fns";

const Label = styled.label``;

const FormikLabel = ({
  name,
  className,
}: Pick<FieldInputProps<any>, "name"> & {
  className?: string;
}) => {
  return (
    <Label className={className}>
      {capitalize(name.replace(/_/g, "\xa0").replace(/enabled/g, "visible"))}
    </Label>
  );
};

export default FormikLabel;

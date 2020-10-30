import React from "react";
import { FieldInputProps } from "formik";
import styled from "styled-components";
import { capitalize } from "../../../../util/fns";

const Label = styled.label``;

const FormikLabel = ({ name }: Pick<FieldInputProps<any>, "name">) => {
  return (
    <Label>
      {capitalize(name.replace(/_/g, "\xa0").replace(/enabled/g, "visible"))}
    </Label>
  );
};

export default FormikLabel;

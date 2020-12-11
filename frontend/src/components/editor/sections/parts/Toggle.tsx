import * as React from "react";
import styled from "styled-components";
import { FieldInputProps, FieldMetaProps } from "formik";
import ToggleBase from "react-toggle";
import "react-toggle/style.css";

import { ReactComponent as Show } from "../../../page/icons/ShowFilled.svg";
import { ReactComponent as Hide } from "../../../page/icons/HideFilled.svg";

import { ThemeShape } from "../../../../typings/Theme.typing";

const Toggle = styled(ToggleBase)`
  > div {
    &:first-of-type {
      background: ${({
        checked,
        theme,
      }: {
        checked: boolean;
        theme: ThemeShape;
      }) => (checked ? theme.green : theme.darkGray)}!important;
    }

    > div {
      height: 100%;
      align-items: center;
      display: flex;
      width: 15px;

      svg {
        height: 15px;
        width: 15px;
        fill: white;
      }
    }
  }
`;

const FormikToggle = ({
  initialTouched,
  initialError,
  initialValue,
  touched,
  error,
  className,
  ...rest
}: FieldInputProps<any> & FieldMetaProps<any> & { className?: string }) => {
  return (
    <Toggle
      {...rest}
      className={className}
      checked={!!rest.value}
      value={rest.value ? "yes" : "no"}
      icons={{ checked: <Show />, unchecked: <Hide /> }}
    />
  );
};

export default FormikToggle;

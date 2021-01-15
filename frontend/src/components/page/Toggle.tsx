import React, { ReactNode } from "react";
import styled from "styled-components";
import { FieldInputProps, FieldMetaProps } from "formik";
import ToggleBase from "react-toggle";
import "react-toggle/style.css";

import { ReactComponent as Check } from "./icons/Check.svg";
import { ReactComponent as X } from "./icons/X.svg";
import { ThemeShape } from "../../typings/Theme.typing";

const Toggle = styled(ToggleBase)`
  > div {
    background: ${({ theme }) => theme.ivory};
    box-shadow: ${({ theme }) => theme.cardShadow};
    transition: ${({ theme }) => theme.cardShadowTransition};
    border-color: ${({ theme }) => theme.main}!important;
    cursor: pointer;

    &:first-of-type {
      background: ${({
        checked,
        theme,
      }: {
        checked: boolean;
        theme: ThemeShape;
      }) => (checked ? theme.main : theme.darkGray)}!important;
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

export interface ToggleShape extends FieldInputProps<any>, FieldMetaProps<any> {
  className?: string;
  checkedIcon?: ReactNode;
  uncheckedIcon?: ReactNode;
}

const FormikToggle = ({
  initialTouched,
  initialError,
  initialValue,
  touched,
  error,
  className,
  checkedIcon = <Check />,
  uncheckedIcon = <X />,
  ...rest
}: ToggleShape) => {
  return (
    <Toggle
      {...rest}
      className={className}
      checked={!!rest.value}
      value={rest.value ? "yes" : "no"}
      icons={{ checked: checkedIcon, unchecked: uncheckedIcon }}
    />
  );
};

export default FormikToggle;

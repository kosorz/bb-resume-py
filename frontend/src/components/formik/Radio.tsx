import React, { ReactNode } from "react";
import styled from "styled-components";
import { FieldInputProps, FieldHelperProps } from "formik";
import CheckIcon from "../symbols/Check";
import { ThemeShape } from "../../util/theme";

const Radio = styled.div`
  box-shadow: ${({ theme }) => theme.cardShadow};
  transition: ${({ theme }) => theme.cardShadowTransition};
  border-radius: ${({ theme }) => theme.spaceSmall / 2 + "px"};
  border-width: ${({ theme }) => theme.spaceSmall / 4 + "px"};
  background: ${({ theme }) => theme.white};
  border-color: ${({
    checked,
    theme,
  }: {
    checked: boolean;
    theme: ThemeShape;
  }) => (checked ? theme.activeMain : "transparent")};
  border-style: solid;
  position: relative;
  cursor: pointer;
  background: ${({ theme }) => theme.ivory};

  &:hover {
    border-color: ${({
      checked,
      theme,
    }: {
      checked: boolean;
      theme: ThemeShape;
    }) => (!checked ? theme.lightMain : theme.activeMain)};
  }
`;

const Decor = styled.div`
  top: ${({ theme }) => theme.spaceSmall / 8 + "px"};
  right: ${({ theme }) => theme.spaceSmall / 8 + "px"};
  width: ${({ theme }) => 1.2 * theme.spaceSmall + "px"};
  height: ${({ theme }) => 1.2 * theme.spaceSmall + "px"};
  background: ${({ theme }) => theme.white};
  border: 1px solid ${({ theme }) => theme.darkGray};
  position: absolute;
  cursor: pointer;
  z-index: 1;
  border-radius: 50%;
  align-items: center;
  display: flex;
`;

const Check = styled(CheckIcon)`
  flex: 100%;
  height: 100%;

  display: ${({ checked }: { checked: boolean }) =>
    checked ? "block" : "none"};
`;

const FormikRadio = ({
  ownValue,
  setValue,
  className,
  children,
  ...rest
}: FieldInputProps<any> &
  FieldHelperProps<any> & {
    ownValue: string;
    className?: string;
    children?: ReactNode | ReactNode[];
  }) => {
  const checked = rest.value === ownValue;

  return (
    <Radio
      checked={checked}
      className={className}
      onClick={() => setValue(ownValue)}
    >
      {children}
      <Decor>
        <Check checked={checked} />
      </Decor>
    </Radio>
  );
};

export default FormikRadio;

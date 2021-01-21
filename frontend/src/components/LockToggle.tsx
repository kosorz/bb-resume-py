import React from "react";
import styled from "styled-components";
import Toggle, { ToggleShape } from "./Toggle";

import { ReactComponent as Lock } from "../assets/icons/Lock.svg";
import { ReactComponent as LockOpen } from "../assets/icons/LockOpen.svg";
import { ThemeShape } from "../util/theme";

const LockToggle = styled(Toggle)`
  > div {
    border-color: ${({ theme }) => theme.orange}!important;

    &:first-of-type {
      background: ${({
        checked,
        theme,
      }: {
        checked: boolean;
        theme: ThemeShape;
      }) => (checked ? theme.orange : theme.darkGray)}!important;
    }
  }
`;

const FormikLockToggle = (props: ToggleShape) => {
  return (
    <LockToggle
      {...props}
      checked={!!props.value}
      checkedIcon={<Lock />}
      uncheckedIcon={<LockOpen />}
    />
  );
};

export default FormikLockToggle;

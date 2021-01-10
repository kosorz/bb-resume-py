import React from "react";
import styled from "styled-components";
import Toggle, { ToggleShape } from "./Toggle";
import { ThemeShape } from "../../../../../typings/Theme.typing";

import { ReactComponent as Lock } from "../../../../page/icons/Lock.svg";
import { ReactComponent as LockOpen } from "../../../../page/icons/LockOpen.svg";

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

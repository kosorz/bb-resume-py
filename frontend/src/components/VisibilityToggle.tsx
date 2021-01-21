import React from "react";
import styled from "styled-components";
import Toggle, { ToggleShape } from "./Toggle";

import { ReactComponent as Show } from "../assets/icons/Show.svg";
import { ReactComponent as Hide } from "../assets/icons/Hide.svg";
import { ThemeShape } from "../util/theme";

const VisibilityToggle = styled(Toggle)`
  > div {
    border-color: ${({ theme }) => theme.green}!important;

    &:first-of-type {
      background: ${({
        checked,
        theme,
      }: {
        checked: boolean;
        theme: ThemeShape;
      }) => (checked ? theme.green : theme.darkGray)}!important;
    }
  }
`;

const FormikVisibilityToggle = (props: ToggleShape) => {
  return (
    <VisibilityToggle
      {...props}
      checked={!!props.value}
      checkedIcon={<Show />}
      uncheckedIcon={<Hide />}
    />
  );
};

export default FormikVisibilityToggle;

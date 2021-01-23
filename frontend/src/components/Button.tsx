import React, { SyntheticEvent, ReactNode } from "react";
import styled from "styled-components";

import media from "../util/media";
import { ThemeShape } from "../util/theme";

const GeneralButton = styled.button`
  border: 0;
  background: ${({ theme }) => theme.main};
  color: ${({ theme }) => theme.white};
  margin: ${({ theme }) => theme.spaceSmall / 2 + "px"};
  border-radius: ${({ theme }) => theme.spaceSmall / 2 + "px"};
  min-height: ${({ theme }) => 1.5 * theme.spaceBig + "px"};
  padding: 0 ${({ theme }) => theme.spaceBig + "px"};
  font-weight: bold;
  font-size: ${({ theme }) => theme.biggerFont};
  cursor: pointer;

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    transform: scale(1.01);
    box-shadow: ${({ theme }: { theme: ThemeShape }) => theme.cardShadow};
    transition: transform 1s;
  }

  ${media.phone`
    padding: 0 ${({ theme }: { theme: ThemeShape }) =>
      theme.spaceSmall / 1.5 + "px"};
    margin: ${({ theme }: { theme: ThemeShape }) =>
      theme.spaceSmall / 4 + "px"};
    font-size: ${({ theme }: { theme: ThemeShape }) => theme.mediumFont};
  `};
`;

const Button = ({
  children,
  onClick,
  className,
  style,
  disabled,
}: {
  children: string | string[] | ReactNode;
  onClick?: (event: SyntheticEvent) => void;
  className?: string;
  style?: Object;
  disabled?: boolean;
}) => (
  <GeneralButton
    style={style}
    className={className}
    type={"button"}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </GeneralButton>
);

export default Button;

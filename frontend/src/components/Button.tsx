import React, { SyntheticEvent } from "react";
import styled from "styled-components";

import media from "../util/media";

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

  ${media.phone`
    flex: 100%;
    margin-left: 0;
    margin-right: 0;
  `};
`;

const Button = ({
  children,
  onClick,
  className,
  style,
}: {
  children: string | string[];
  onClick: (event: SyntheticEvent) => void;
  className?: string;
  style?: Object;
}) => (
  <GeneralButton
    style={style}
    className={className}
    type={"button"}
    onClick={onClick}
  >
    {children}
  </GeneralButton>
);

export default Button;

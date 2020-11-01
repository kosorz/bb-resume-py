import React, { SyntheticEvent } from "react";
import styled from "styled-components";

import media from "../../styled/media";

const GeneralButton = styled.button`
  background: transparent;
  cursor: pointer;
  margin: ${({ theme }) => theme.spaceSmall / 2 + "px"};
  border-radius: ${({ theme }) => theme.spaceSmall / 4 + "px"};
  height: ${({ theme }) => theme.spaceBig + "px"};

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
}: {
  children: string | string[];
  onClick: (event: SyntheticEvent) => void;
  className?: string;
}) => (
  <GeneralButton className={className} type={"button"} onClick={onClick}>
    {children}
  </GeneralButton>
);

export default Button;

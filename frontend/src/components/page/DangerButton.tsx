import React, { SyntheticEvent } from "react";
import styled from "styled-components";

import Button from "./Button";

const DangerButtonWrapper = styled(Button)`
  background: ${({ theme }) => theme.red};
  color: ${({ theme }) => theme.white};
`;

const DangerButton = ({
  children,
  onClick,
  className,
}: {
  children: string | string[];
  onClick: (event: SyntheticEvent) => void;
  className?: string;
}) => (
  <DangerButtonWrapper className={className} onClick={onClick}>
    {children}
  </DangerButtonWrapper>
);

export default DangerButton;

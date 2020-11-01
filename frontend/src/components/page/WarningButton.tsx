import React, { SyntheticEvent } from "react";
import styled from "styled-components";

import DangerButton from "./DangerButton";

const WarningButtonWrapper = styled(DangerButton)`
  background: ${({ theme }) => theme.orange};
`;

const WarningButton = ({
  children,
  onClick,
  className,
}: {
  children: string | string[];
  onClick: (event: SyntheticEvent) => void;
  className?: string;
}) => (
  <WarningButtonWrapper className={className} onClick={onClick}>
    {children}
  </WarningButtonWrapper>
);

export default WarningButton;

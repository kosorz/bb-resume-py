import React, { SyntheticEvent } from "react";
import styled from "styled-components";

import DangerButton from "./DangerButton";

const SuccessButtonWrapper = styled(DangerButton)`
  background: ${({ theme }) => theme.green};
`;

const SuccessButton = ({
  children,
  onClick,
  className,
}: {
  children: string | string[];
  onClick: (event: SyntheticEvent) => void;
  className?: string;
}) => (
  <SuccessButtonWrapper className={className} onClick={onClick}>
    {children}
  </SuccessButtonWrapper>
);

export default SuccessButton;

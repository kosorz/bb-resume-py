import React from "react";
import styled from "styled-components";

import Button from "./Button";

const Wrapper = styled.div`
  justify-content: flex-end;
  display: flex;
  margin-top: ${({ theme }) => theme.spaceSmall + "px"};
`;

const VerticalKnobs = ({
  upLabel = "Move up",
  downLabel = "Move down",
  className,
}: {
  upLabel?: string;
  downLabel?: string;
  className?: string;
}) => (
  <Wrapper className={className}>
    <Button onClick={() => {}}>&#8744;&nbsp;{downLabel}</Button>&nbsp;
    <Button onClick={() => {}}>{upLabel}&nbsp;&#8743;</Button>
  </Wrapper>
);

export default VerticalKnobs;

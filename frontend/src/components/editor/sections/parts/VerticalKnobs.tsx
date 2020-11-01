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
  renderUp = true,
  renderDown = true,
  className,
}: {
  upLabel?: string;
  downLabel?: string;
  className?: string;
  renderUp?: boolean;
  renderDown?: boolean;
}) => (
  <Wrapper className={className}>
    {renderDown && (
      <>
        <Button onClick={() => {}}>&#8744;&nbsp;{downLabel}</Button>&nbsp;
      </>
    )}
    {renderUp && <Button onClick={() => {}}>{upLabel}&nbsp;&#8743;</Button>}
  </Wrapper>
);

export default VerticalKnobs;

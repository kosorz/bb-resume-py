import React from "react";
import styled from "styled-components";

import Button from "../../../page/Button";
import media from "../../../../styled/media";

const Wrapper = styled.div`
  justify-content: flex-end;
  display: flex;

  ${media.phone`
    flex: 100%;
    flex-wrap: wrap;
  `};
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
    {renderUp && <Button onClick={() => {}}>{upLabel}&nbsp;&#8743;</Button>}
    {renderDown && <Button onClick={() => {}}>&#8744;&nbsp;{downLabel}</Button>}
  </Wrapper>
);

export default VerticalKnobs;

import React, { SyntheticEvent } from "react";
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
  onUp = () => {},
  onDown = () => {},
  className,
}: {
  upLabel?: string;
  downLabel?: string;
  className?: string;
  renderUp?: boolean;
  renderDown?: boolean;
  onUp?: (event: SyntheticEvent<Element, Event>) => void;
  onDown?: (event: SyntheticEvent<Element, Event>) => void;
}) => (
  <Wrapper className={className}>
    {renderUp && <Button onClick={onUp}>&#8743;&nbsp;{upLabel}</Button>}
    {renderDown && <Button onClick={onDown}>&#8744;&nbsp;{downLabel}</Button>}
  </Wrapper>
);

export default VerticalKnobs;

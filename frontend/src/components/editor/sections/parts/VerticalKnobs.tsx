import React from "react";
import styled from "styled-components";

import Knob from "./Knob";

const Wrapper = styled.div`
  flex: 100%;
  justify-content: flex-end;
  display: flex;
  margin-top: ${({ theme }) => theme.spaceSmall + "px"};
`;

const VerticalKnobs = () => (
  <Wrapper>
    <Knob onClick={() => {}}>⋁⋁⋁ Move</Knob>
    <span> || </span>
    <Knob onClick={() => {}}>Move ⋀⋀⋀</Knob>
  </Wrapper>
);

export default VerticalKnobs;

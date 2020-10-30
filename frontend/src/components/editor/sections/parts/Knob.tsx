import React, { SyntheticEvent } from "react";
import styled from "styled-components";

const SectionKnob = styled.button`
  background: transparent;
  border: 0;
  cursor: pointer;
`;

const Knob = ({
  children,
  onClick,
}: {
  children: string;
  onClick: (event: SyntheticEvent) => void;
}) => (
  <SectionKnob type={"button"} onClick={onClick}>
    {children}
  </SectionKnob>
);

export default Knob;

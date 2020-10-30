import React, { ReactElement } from "react";
import styled from "styled-components";

const Wrapper = styled.fieldset`
  display: flex;
  flex-wrap: wrap;
  flex-grow: 1;
  border-radius: ${({ theme }) => theme.space / 2 + "px"};
  border: ${({ theme }) => "1px solid" + theme.gray};

  label,
  input {
    flex: 100%;
  }
`;

const Values = ({ children }: { children: ReactElement | ReactElement[] }) => (
  <Wrapper>{children}</Wrapper>
);

export default Values;

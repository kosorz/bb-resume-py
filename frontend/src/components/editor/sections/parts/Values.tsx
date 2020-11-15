import React, { ReactElement } from "react";
import styled from "styled-components";

import FieldSet from "./Fieldset";

const Wrapper = styled(FieldSet)`
  flex-grow: 1;

  label,
  input {
    flex: 100%;
  }
`;

const Values = ({ children }: { children: ReactElement | ReactElement[] }) => (
  <Wrapper>{children}</Wrapper>
);

export default Values;

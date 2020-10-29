import React, { ReactNode } from "react";
import styled from "styled-components";

const Wrapper = styled.form`
  margin-bottom: 10px;
  margin-left: 20px;
`;

const SubForm = ({ children }: { children: ReactNode | ReactNode[] }) => (
  <Wrapper>{children}</Wrapper>
);

export default SubForm;

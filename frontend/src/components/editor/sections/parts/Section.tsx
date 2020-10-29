import React, { ReactNode } from "react";
import styled from "styled-components";

const Wrapper = styled.section`
  margin-bottom: 20px;
`;

const Section = ({ children }: { children: ReactNode | ReactNode[] }) => (
  <Wrapper>{children}</Wrapper>
);

export default Section;

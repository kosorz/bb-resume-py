import React, { ReactNode } from "react";
import styled from "styled-components";

const Wrapper = styled.section`
  margin-top: ${({ theme }) => theme.spaceSmall + "px"};
  margin-left: ${({ theme }) => theme.spaceSmall + "px"};
  margin-bottom: ${({ theme }) => theme.spaceBig + "px"};
  padding-bottom: ${({ theme }) => theme.spaceSmall + "px"};
  border-bottom: ${({ theme }) => "1px dashed" + theme.gray};
`;

const SubSection = ({ children }: { children: ReactNode | ReactNode[] }) => (
  <Wrapper>{children}</Wrapper>
);

export default SubSection;

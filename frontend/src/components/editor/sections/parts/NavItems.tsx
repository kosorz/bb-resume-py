import React, { ReactNode } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

const NavItems = ({
  children,
  className,
}: {
  children: ReactNode | ReactNode[];
  className?: string;
}) => <Wrapper className={className}>{children}</Wrapper>;

export default NavItems;

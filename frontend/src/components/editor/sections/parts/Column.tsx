import React, { ReactNode } from "react";
import styled from "styled-components";

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.dark};
`;

const Column = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode | ReactNode[];
}) => {
  return (
    <Wrapper>
      <Title>{title}</Title>
      {children}
    </Wrapper>
  );
};

export default Column;

import React, { ReactNode } from "react";
import styled from "styled-components";

const Wrapper = styled.section`
  margin-bottom: ${({ theme }) => theme.space + "px"};
  padding: ${({ theme }) => theme.space + "px"};
  padding-top: 0;
  border-radius: ${({ theme }) => theme.space / 2 + "px"};
  background-color: ${({ theme }) => theme.white};
  border: ${({ theme }) => "1px solid" + theme.gray};
`;

const Title = styled.h2``;

const Purpose = styled.p`
  text-align: justify;
  font-style: italic;
`;

const Section = ({
  children,
  title,
  purpose,
}: {
  children: ReactNode | ReactNode[];
  title: string;
  purpose?: string;
}) => (
  <Wrapper>
    <Title>{title}</Title>
    <Purpose>{purpose}</Purpose>
    {children}
  </Wrapper>
);

export default Section;

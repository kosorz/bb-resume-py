import React, { ReactNode } from "react";
import styled from "styled-components";
import { Title } from "../../Editor";

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
`;

const Column = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode | ReactNode[];
}) => {
  return (
    <>
      <Title>{title}</Title>
      <Wrapper>{children}</Wrapper>
    </>
  );
};

export default Column;

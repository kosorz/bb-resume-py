import React, { ReactNode } from "react";
import styled from "styled-components";

const Wrapper = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Form = ({
  children,
  className,
}: {
  children: ReactNode | ReactNode[];
  className?: string;
}) => <Wrapper className={className}>{children}</Wrapper>;

export default Form;

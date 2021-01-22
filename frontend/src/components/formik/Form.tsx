import React, { ReactNode } from "react";
import styled from "styled-components";

const FormikForm = styled.form`
  display: flex;
  flex-wrap: wrap;
  padding: 0 ${({ theme }) => theme.spaceSmall + "px"};
`;

const Form = ({
  children,
  className,
}: {
  children: ReactNode | ReactNode[];
  className?: string;
}) => <FormikForm className={className}>{children}</FormikForm>;

export default Form;

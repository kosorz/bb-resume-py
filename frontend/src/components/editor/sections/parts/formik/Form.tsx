import React, { ReactNode } from "react";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  padding: 0 ${({ theme }) => theme.spaceSmall + "px"};
`;

const FormikForm = ({
  children,
  className,
}: {
  children: ReactNode | ReactNode[];
  className?: string;
}) => <Form className={className}>{children}</Form>;

export default FormikForm;

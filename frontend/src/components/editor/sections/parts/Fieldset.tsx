import React, { ReactNode } from "react";
import styled from "styled-components";

const FieldSetWrapper = styled.fieldset`
  display: flex;
  align-content: flex-start;
  flex-wrap: wrap;
  border: 0;
`;

const FieldSet = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode | ReactNode[];
}) => {
  return <FieldSetWrapper className={className}>{children}</FieldSetWrapper>;
};

export default FieldSet;

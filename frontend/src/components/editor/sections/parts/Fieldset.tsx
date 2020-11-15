import React, { ReactNode } from "react";
import styled from "styled-components";

const FieldSetWrapper = styled.fieldset`
  display: flex;
  align-content: flex-start;
  flex-wrap: wrap;
  border: ${({ theme }) => "1px solid" + theme.main};
  border-radius: ${({ theme }) => theme.spaceSmall / 4 + "px"};
`;

const FieldSet = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode | ReactNode[];
}) => <FieldSetWrapper className={className}>{children}</FieldSetWrapper>;

export default FieldSet;

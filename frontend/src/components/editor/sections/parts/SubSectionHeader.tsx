import React, { ReactElement } from "react";
import styled from "styled-components";

import FieldSet from "./Fieldset";

const Wrapper = styled(FieldSet)`
  flex: 100%;
  display: flex;
  flex-wrap: wrap;
  padding-left: 0;
  padding-right: 0;
  border: 0;

  input,
  label {
    flex: 100%;
  }
`;

const SubSectionHeader = ({
  children,
  className,
}: {
  children: ReactElement | ReactElement[];
  className?: string;
}) => <Wrapper className={className}>{children}</Wrapper>;

export default SubSectionHeader;

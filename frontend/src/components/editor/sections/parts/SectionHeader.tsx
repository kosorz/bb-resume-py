import React, { ReactElement } from "react";
import styled from "styled-components";

import SubSectionHeader from "./SubSectionHeader";

const Wrapper = styled(SubSectionHeader)`
  border-bottom: ${({ theme }) => "1px dashed" + theme.main};
  margin-bottom: ${({ theme }) => theme.spaceBig + "px"};
`;

const SectionHeader = ({
  children,
}: {
  children: ReactElement | ReactElement[];
}) => <Wrapper>{children}</Wrapper>;

export default SectionHeader;

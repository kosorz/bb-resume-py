import React, { ReactNode } from "react";
import styled from "styled-components";

import { ThemeShape } from "../../../../typings/theme.typing";

const Wrapper = styled.section`
  margin-top: ${({ theme }) => theme.spaceSmall + "px"};
  margin-left: ${({ theme }) => theme.spaceSmall + "px"};

  margin-bottom: ${({
    theme,
    isLast,
  }: {
    isLast: boolean;
    theme: ThemeShape;
  }) => (!isLast ? theme.spaceBig + "px" : "")};
  padding-bottom: ${({
    theme,
    isLast,
  }: {
    isLast: boolean;
    theme: ThemeShape;
  }) => (!isLast ? theme.spaceSmall + "px" : "")};
  border-bottom: ${({
    theme,
    isLast,
  }: {
    isLast: boolean;
    theme: ThemeShape;
  }) => (!isLast ? "1px dashed" + theme.gray : "")};
`;

const SubSection = ({
  children,
  isLast,
}: {
  children: ReactNode | ReactNode[];
  isLast: boolean;
}) => <Wrapper isLast={isLast}>{children}</Wrapper>;

export default SubSection;

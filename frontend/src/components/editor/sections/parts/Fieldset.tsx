import React, { ReactNode, useContext } from "react";
import styled from "styled-components";
import { observer } from "mobx-react-lite";

import { ResumeBubble } from "../../../../bubbles/ResumeBubble";

const FieldSetWrapper = styled.fieldset`
  display: flex;
  align-content: flex-start;
  flex-wrap: wrap;
  border: 1px solid;
  border-radius: ${({ theme }) => theme.spaceSmall / 4 + "px"};
`;

const FieldSet = observer(
  ({
    className,
    children,
  }: {
    className?: string;
    children: ReactNode | ReactNode[];
  }) => {
    const resumeBubble = useContext(ResumeBubble);
    const { colors } = resumeBubble.resume.meta!;

    return (
      <FieldSetWrapper
        style={{ borderColor: colors.main }}
        className={className}
      >
        {children}
      </FieldSetWrapper>
    );
  }
);

export default FieldSet;

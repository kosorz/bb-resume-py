import React, { useContext, ReactNode } from "react";
import styled from "styled-components";

import axios from "../../../../../util/axios";
import { observer } from "mobx-react-lite";
import { ResumeBubble } from "../../../../../bubbles/ResumeBubble";
import Button from "../../../../page/Button";

const AddWrapper = styled.div`
  display: flex;
  margin-top: ${({ theme }) => theme.spaceSmall + "px"};
  justify-content: center;
  opacity: 0;
`;

const Wrapper = styled.section`
  padding: ${({ theme }) => theme.space + "px"};
  flex: 100%;

  &:hover ${AddWrapper} {
    opacity: 1;
    transition: opacity 0.2s ease-in-out;
  }
`;

const Pick = observer(
  ({
    identifier,
    children,
    className,
  }: {
    identifier: "skills" | "experience";
    children: ReactNode | ReactNode[];
    className?: string;
  }) => {
    const resumeBubble = useContext(ResumeBubble);
    const { resume, addSectionUpdate } = resumeBubble;
    const { id, meta } = resume;
    const { paper, colors } = meta!;
    const { layout } = paper;

    const addSection = (
      identifier: "skills" | "experience",
      order: "order" | "leftOrder" | "rightOrder"
    ) =>
      axios
        .post(`/parts/${id}/${identifier}/${order}`)
        .then((res) => addSectionUpdate(res.data, identifier, order));

    return (
      <Wrapper style={{ borderColor: colors.main }} className={className}>
        {children}
        <AddWrapper>
          {layout === "full" && (
            <Button onClick={() => addSection(identifier, "order")}>
              Add to resume
            </Button>
          )}
          {layout === "split" && (
            <>
              <Button onClick={() => addSection(identifier, "leftOrder")}>
                Add to left column
              </Button>
              <Button onClick={() => addSection(identifier, "rightOrder")}>
                Add to right column
              </Button>
            </>
          )}
        </AddWrapper>
      </Wrapper>
    );
  }
);

export default Pick;

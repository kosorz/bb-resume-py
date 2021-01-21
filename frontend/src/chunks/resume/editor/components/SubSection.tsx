import React, { ReactNode, useContext } from "react";
import styled from "styled-components";
import { Collapse } from "react-collapse";

import Move from "../../../../components/symbols/Move";
import Trash from "../../../../components/symbols/Trash";
import Close from "../../../../components/symbols/Close";
import Pencil from "../../../../components/symbols/Pencil";
import { ResumeBubble } from "../../ResumeBubble";
import { wobbleTwo, wobbleOne } from "./Wooble";

const Wrapper = styled.section`
  overflow-anchor: none;
  background: ${({ theme }) => theme.white};

  &:nth-of-type(2n) > article {
    animation-name: ${({ wobble }: { wobble: boolean }) =>
      wobble ? wobbleOne : ""};
    animation-iteration-count: infinite;
    transform-origin: 50% 10%;
    animation-duration: 0.5s;
  }

  &:nth-of-type(2n + 1) > article {
    animation-name: ${({ wobble }: { wobble: boolean }) =>
      wobble ? wobbleTwo : ""};
    animation-iteration-count: infinite;
    transform-origin: 30% 5%;
    animation-duration: 0.5s;
  }
`;

const Row = styled.article`
  border-bottom: 1px solid ${({ theme }) => theme.gray};
  border-radius: ${({ theme }) => theme.spaceSmall / 4 + "px"};
  padding: ${({ theme }) => theme.spaceSmall + "px"};
  box-sizing: border-box;
  display: flex;
  flex: 100%;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h4`
  color: ${({ theme }) => theme.main};
  margin: 0;
`;

const Controls = styled.div`
  display: flex;

  svg {
    padding: ${({ theme }) => theme.spaceSmall / 2 + "px"};
    border-radius: 50%;
  }
`;

const SubSection = ({
  id,
  wobble,
  identifier,
  opened,
  children,
  isLast,
  isFirst,
  title,
  renderDelete,
  deleteFn,
}: {
  id: number;
  children: ReactNode;
  wobble: boolean;
  identifier: "skills" | "experience";
  isLast: boolean;
  isFirst: boolean;
  title: string;
  renderDelete: boolean;
  opened: boolean;
  deleteFn: Function;
}) => {
  const resumeBubble = useContext(ResumeBubble);
  const { setOpenSubSection } = resumeBubble;
  const handleDelete = () => {
    if (
      window.confirm(
        `Are you sure you want to delete this ${title}? This operation is irreversible.`
      )
    ) {
      deleteFn();
    }
  };

  return (
    <Wrapper wobble={wobble}>
      <Row>
        <Title>{title}</Title>
        <Controls>
          {(!isFirst || !isLast) && (
            <>
              {renderDelete && <Trash onClick={handleDelete} />}
              {opened ? (
                <Close
                  onClick={() => setOpenSubSection(identifier, undefined)}
                />
              ) : (
                <>
                  <Pencil onClick={() => setOpenSubSection(identifier, id)} />
                  <Move />
                </>
              )}
            </>
          )}
        </Controls>
      </Row>
      <Collapse isOpened={opened}>{children}</Collapse>
    </Wrapper>
  );
};

export default SubSection;

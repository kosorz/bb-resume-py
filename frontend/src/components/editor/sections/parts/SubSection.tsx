import React, { ReactNode, SyntheticEvent } from "react";
import styled from "styled-components";
import { Collapse } from "react-collapse";

import VerticalKnobs from "./VerticalKnobs";
import Trash from "../../../page/Trash";
import Close from "../../../page/Close";
import Pencil from "../../../page/Pencil";

const Wrapper = styled.section`
  overflow-anchor: none;
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
  opened,
  setOpened,
  children,
  isLast,
  isFirst,
  title,
  renderDelete,
  deleteFn,
  onUp,
  onDown,
}: {
  id: number;
  children: ReactNode;
  isLast: boolean;
  isFirst: boolean;
  title: string;
  renderDelete: boolean;
  opened: boolean;
  setOpened: Function;
  deleteFn: Function;
  onUp?: (event: SyntheticEvent<Element, Event>) => void;
  onDown?: (event: SyntheticEvent<Element, Event>) => void;
}) => {
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
    <Wrapper>
      <Row>
        <Title>{title}</Title>
        <Controls>
          <VerticalKnobs
            onUp={onUp}
            onDown={onDown}
            renderUp={!isFirst}
            renderDown={!isLast}
          />
          {opened ? (
            <Close onClick={() => setOpened(undefined)} />
          ) : (
            <Pencil onClick={() => setOpened(id)} />
          )}
          {renderDelete && <Trash onClick={handleDelete} />}
        </Controls>
      </Row>
      <Collapse isOpened={opened}>{children}</Collapse>
    </Wrapper>
  );
};

export default SubSection;

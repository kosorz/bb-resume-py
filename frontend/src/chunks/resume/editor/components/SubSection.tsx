import React, { ReactNode, useContext } from "react";
import styled from "styled-components";
import { Collapse } from "react-collapse";

import Move from "../../../../components/symbols/Move";
import Trash from "../../../../components/symbols/Trash";
import Close from "../../../../components/symbols/Close";
import Pencil from "../../../../components/symbols/Pencil";
import { ResumeBubble } from "../../Resume.bubble";
import { wobbleTwo, wobbleOne } from "./Wooble";
import { ThemeShape } from "../../../../util/theme";

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
  border-bottom: ${({
    opened,
    theme,
  }: {
    opened: boolean;
    theme: ThemeShape;
  }) => (opened ? 0 : "1px solid " + theme.gray)};
  border-radius: ${({ theme }) => theme.spaceSmall / 4 + "px"};
  margin: ${({ theme }: { theme: ThemeShape }) => theme.spaceSmall + "px"};
  margin-bottom: ${({
    opened,
    theme,
  }: {
    opened: boolean;
    theme: ThemeShape;
  }) => (opened ? -2 * theme.spaceSmall : theme.spaceSmall) + "px"};
  box-sizing: border-box;
  display: flex;
  flex: 100%;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h4`
  color: ${({ theme }) => theme.main};
  opacity: ${({ transparent }: { transparent: boolean }) =>
    transparent ? "0" : "1"};
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

  return (
    <Wrapper wobble={wobble}>
      <Row opened={opened}>
        <Title transparent={opened}>{title}</Title>
        <Controls>
          {(!isFirst || !isLast) && (
            <>
              {renderDelete && !opened && <Trash onClick={() => deleteFn()} />}
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

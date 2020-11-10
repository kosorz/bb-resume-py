import React, { ReactNode, useContext, useState, useEffect } from "react";
import styled from "styled-components";

import Button from "../../../page/Button";
import VerticalKnobs from "./VerticalKnobs";
import NavItems from "./NavItems";
import SuccessButton from "../../../page/SuccessButton";
import DangerButton from "../../../page/DangerButton";
import WarningButton from "../../../page/WarningButton";

import { ResumeBubble } from "../../../../bubbles/ResumeBubble";
import media from "../../../../styled/media";

const Wrapper = styled.section`
  margin-bottom: ${({ theme }) => theme.space + "px"};
  padding: ${({ theme }) => theme.space + "px"};
  padding-top: 0;
  border-radius: ${({ theme }) => theme.spaceSmall / 2 + "px"};
  background-color: ${({ theme }) => theme.white};
  /* border: ${({ theme }) => "1px solid" + theme.main}; */

  ${media.phone`
    //@ts-ignore
    padding: ${({ theme }) => theme.spaceSmall + "px"}
  `};
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.dark};
`;

const Purpose = styled.p`
  text-align: justify;
  font-size: ${({ theme }) => theme.smallFont};
`;

const AddWrapper = styled.div`
  ${media.phone`
    display: flex;
  `};
`;

const Footer = styled.div`
  padding-top: ${({ theme }) => theme.space + "px"};
  margin-top: ${({ theme }) => theme.space + "px"};
  border-top: ${({ theme }) => "3px solid" + theme.dark};
`;

const Chin = styled(Footer)`
  flex-direction: column;
  border-top: ${({ theme }) => "2px solid" + theme.dark};
`;

const NavTitle = styled.h4`
  flex: 100%;
  color: ${({ theme }) => theme.dark};
`;

const SectionVerticalKnobs = styled(VerticalKnobs)`
  flex-wrap: wrap;
  justify-content: flex-start;
`;

const Section = ({
  children,
  title,
  expanded,
  identifier,
  setExpanded,
  subtitle,
  purpose,
  addFn,
}: {
  children: ReactNode | ReactNode[];
  title: string;
  purpose: string;
  identifier: string;
  addFn?: Function;
  subtitle?: string;
  expanded?: boolean;
  setExpanded?: Function;
}) => {
  const [positionData, setPositionData] = useState<{
    isFirst: boolean;
    isLast: boolean;
    movable: boolean;
    migratable: boolean;
    column: string;
  }>({
    isFirst: false,
    isLast: false,
    movable: false,
    migratable: identifier !== "info",
    column: "",
  });
  const resumeBubble = useContext(ResumeBubble);
  const { content, paper } = resumeBubble.resume.meta;
  const { split, full } = content;
  const { layout } = paper;

  useEffect(() => {
    const data =
      layout === "split"
        ? {
            isFirst:
              split.leftOrder[0] === identifier ||
              split.rightOrder[0] === identifier,
            isLast:
              split.leftOrder[split.leftOrder.length - 1] === identifier ||
              split.rightOrder[split.rightOrder.length - 1] === identifier,
            movable:
              !split.unlisted.includes(identifier) && identifier !== "info",
            column: split.leftOrder.includes(identifier)
              ? "splitListedLeft"
              : split.rightOrder.includes(identifier)
              ? "splitListedRight"
              : "splitUnlisted",
          }
        : {
            isFirst: full.order[0] === identifier,
            isLast: full.order[full.order.length - 1] === identifier,
            movable:
              !full.unlisted.includes(identifier) && identifier !== "info",
            column: full.order.includes(identifier)
              ? "fullListed"
              : "fullUnlisted",
          };
    setPositionData((prevState) => {
      return { ...prevState, ...data };
    });
  }, [
    layout,
    identifier,
    split.rightOrder,
    split.leftOrder,
    split.unlisted,
    full.order,
    full.unlisted,
  ]);

  const { isFirst, isLast, movable, migratable, column } = positionData;
  const manageable = movable || migratable;

  const renderMigration = () => {
    const renderDeleteButton = () => (
      <DangerButton onClick={() => {}}>Delete</DangerButton>
    );
    const renderUnlistButton = () => (
      <WarningButton onClick={() => {}}>Unlist</WarningButton>
    );

    if (column === "splitListedLeft" || column === "splitListedRight") {
      return (
        <>
          <Button onClick={() => {}}>
            Migrate&nbsp;to&nbsp;Column&nbsp;
            {column === "splitListedLeft" ? "II" : "I"}
          </Button>
          {renderUnlistButton()}
        </>
      );
    }

    if (column === "splitUnlisted") {
      return (
        <>
          <Button onClick={() => {}}>List&nbsp;in&nbsp;Column&nbsp;I</Button>
          <Button onClick={() => {}}>List&nbsp;in&nbsp;Column&nbsp;II</Button>
          {renderDeleteButton()}
        </>
      );
    }

    if (column === "fullListed") return renderUnlistButton();

    if (column === "fullUnlisted") {
      return (
        <>
          <Button onClick={() => {}}>List&nbsp;in&nbsp;Resume</Button>
          {renderDeleteButton()}
        </>
      );
    }
  };

  return (
    <Wrapper>
      <Title>{title}</Title>
      <Purpose>{purpose}</Purpose>
      {expanded && (
        <>
          {children}
          {subtitle && addFn && (
            <AddWrapper>
              <SuccessButton onClick={() => addFn()}>
                + Add new {subtitle}
              </SuccessButton>
            </AddWrapper>
          )}
          {manageable && (
            <Chin>
              <NavTitle>Manage {title.toLocaleLowerCase()}:</NavTitle>
              <NavItems>
                {(!isFirst || !isLast) && movable && (
                  <SectionVerticalKnobs
                    upLabel={`Move\xa0up`}
                    downLabel={`Move\xa0down`}
                    renderUp={!isFirst}
                    renderDown={!isLast}
                  />
                )}
                {migratable && renderMigration()}
              </NavItems>
            </Chin>
          )}
        </>
      )}
      <Footer>
        {setExpanded && (
          <Button onClick={() => setExpanded(!expanded)}>
            {expanded ? "<<<\xa0Close" : "Edit\xa0>>>"}
          </Button>
        )}
      </Footer>
    </Wrapper>
  );
};

export default Section;

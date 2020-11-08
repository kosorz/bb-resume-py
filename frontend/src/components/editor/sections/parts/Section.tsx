import React, { ReactNode } from "react";
import styled from "styled-components";
import Button from "../../../page/Button";
import VerticalKnobs from "./VerticalKnobs";
import NavItems from "./NavItems";
import SuccessButton from "../../../page/SuccessButton";
import WarningButton from "../../../page/WarningButton";
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
  setExpanded,
  subtitle,
  isFirst,
  isLast,
  purpose,
  addFn,
  icon,
  movable = true,
}: {
  children: ReactNode | ReactNode[];
  title: string;
  purpose: string;
  isFirst: boolean;
  isLast: boolean;
  addFn?: Function;
  subtitle?: string;
  movable?: boolean;
  icon?: ReactNode;
  expanded?: boolean;
  setExpanded?: Function;
}) => (
  <Wrapper>
    <Title>{title}</Title>
    {icon && icon}
    <Purpose>{purpose}</Purpose>
    {children}
    {expanded && movable && (
      <>
        {subtitle && addFn && (
          <AddWrapper>
            <SuccessButton onClick={() => addFn()}>
              + Add new {subtitle}
            </SuccessButton>
          </AddWrapper>
        )}
        <Chin>
          <NavTitle>Manage:</NavTitle>
          <NavItems>
            {(!isFirst || !isLast) && (
              <SectionVerticalKnobs
                upLabel={`Move\xa0${title.toLowerCase()}\xa0up`}
                downLabel={`Move\xa0${title.toLowerCase()}\xa0down`}
                renderUp={!isFirst}
                renderDown={!isLast}
              />
            )}
            <WarningButton onClick={() => {}}>
              o&nbsp;Migrate&nbsp;{title.toLowerCase()}
              &nbsp;to&nbsp;Column&nbsp;II
            </WarningButton>
          </NavItems>
        </Chin>
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

export default Section;

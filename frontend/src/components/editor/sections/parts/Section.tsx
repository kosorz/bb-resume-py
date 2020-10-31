import React, { ReactNode } from "react";
import styled from "styled-components";
import Button from "./Button";
import VerticalKnobs from "./VerticalKnobs";

const Wrapper = styled.section`
  margin-bottom: ${({ theme }) => theme.space + "px"};
  padding: ${({ theme }) => theme.space + "px"};
  padding-top: 0;
  border-radius: ${({ theme }) => theme.spaceSmall / 2 + "px"};
  background-color: ${({ theme }) => theme.white};
  border: ${({ theme }) => "1px solid" + theme.gray};
`;

const Title = styled.h2``;

const Purpose = styled.p`
  text-align: justify;
  font-style: italic;
`;

const Footer = styled.div`
  padding-top: ${({ theme }) => theme.space + "px"};
  margin-top: ${({ theme }) => theme.space + "px"};
  border-top: ${({ theme }) => "3px solid" + theme.gray};
`;

const Chin = styled(Footer)`
  flex-direction: column;
  border-top: ${({ theme }) => "1px solid" + theme.gray};
`;

const NavTitle = styled.h4`
  flex: 100%;
`;

const NavItems = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const SectionVerticalKnobs = styled(VerticalKnobs)`
  margin-top: 0;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

const Section = ({
  children,
  title,
  expanded,
  setExpanded,
  purpose,
  movable = true,
}: {
  children: ReactNode | ReactNode[];
  title: string;
  purpose: string;
  movable?: boolean;
  expanded?: boolean;
  setExpanded?: Function;
}) => (
  <Wrapper>
    <Title>{title}</Title>
    <Purpose>{purpose}</Purpose>
    {children}
    {expanded && movable && (
      <Chin>
        <NavTitle>Manage section:</NavTitle>
        <NavItems>
          <SectionVerticalKnobs
            upLabel={`Move\xa0${title}\xa0up`}
            downLabel={`Move\xa0${title}\xa0down`}
          />
          <Button onClick={() => {}}>
            Migrate&nbsp;{title.toLocaleLowerCase()}&nbsp;to&nbsp;Column&nbsp;II
          </Button>
        </NavItems>
      </Chin>
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

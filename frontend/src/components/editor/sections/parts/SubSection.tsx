import React, { ReactNode, SyntheticEvent } from "react";
import styled from "styled-components";

import VerticalKnobs from "./VerticalKnobs";
import NavItems from "./NavItems";
import DangerButton from "../../../page/DangerButton";

import media from "../../../../styled/media";

const Wrapper = styled.section`
  margin-top: ${({ theme }) => theme.spaceSmall + "px"};
  margin-left: ${({ theme }) => theme.spaceSmall + "px"};

  margin-bottom: ${({ theme }) => theme.spaceBig + "px"};
  padding-bottom: ${({ theme }) => theme.spaceSmall + "px"};
  border-bottom: ${({ theme }) => "1px dashed" + theme.main};

  ${media.phone`
    margin-left: 0
  `};
`;

const SubSectionNav = styled(NavItems)`
  margin-top: ${({ theme }) => theme.spaceSmall + "px"};
  display: flex;
  justify-content: space-between;
`;

const SubSectionVerticalKnobs = styled(VerticalKnobs)`
  ${media.phone`
    order: -1;
  `};
`;

const SubSection = ({
  children,
  isLast,
  isFirst,
  title,
  renderDelete,
  deleteFn,
  onUp,
  onDown,
}: {
  children: ReactNode | ReactNode[];
  isLast: boolean;
  isFirst: boolean;
  title: string;
  renderDelete: boolean;
  deleteFn: Function;
  onUp?: (event: SyntheticEvent<Element, Event>) => void;
  onDown?: (event: SyntheticEvent<Element, Event>) => void;
}) => {
  const handleClick = () => {
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
      {children}
      <SubSectionNav>
        {renderDelete && (
          <DangerButton onClick={handleClick}>x Delete</DangerButton>
        )}
        <SubSectionVerticalKnobs
          onUp={onUp}
          onDown={onDown}
          renderUp={!isFirst}
          renderDown={!isLast}
        />
      </SubSectionNav>
    </Wrapper>
  );
};

export default SubSection;

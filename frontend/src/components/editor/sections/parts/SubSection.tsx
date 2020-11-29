import React, { ReactNode, SyntheticEvent } from "react";
import styled from "styled-components";

import VerticalKnobs from "./VerticalKnobs";
import NavItems from "./NavItems";
import DangerButton from "../../../page/DangerButton";

import media from "../../../../styled/media";

const Wrapper = styled.section``;

const SubSectionNav = styled(NavItems)`
  margin: 0 ${({ theme }) => theme.space + "px"};
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
      {children}
      <SubSectionNav>
        {renderDelete && (
          <DangerButton onClick={handleDelete}>x Delete</DangerButton>
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

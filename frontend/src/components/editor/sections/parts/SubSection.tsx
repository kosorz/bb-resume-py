import React, { ReactNode, SyntheticEvent, useContext } from "react";
import styled from "styled-components";

import VerticalKnobs from "./VerticalKnobs";
import NavItems from "./NavItems";
import DangerButton from "../../../page/DangerButton";

import media from "../../../../styled/media";
import { ResumeBubble } from "../../../../bubbles/ResumeBubble";

const Wrapper = styled.section`
  margin-top: ${({ theme }) => theme.spaceSmall + "px"};
  margin-left: ${({ theme }) => theme.spaceSmall + "px"};

  margin-bottom: ${({ theme }) => theme.spaceBig + "px"};
  padding-bottom: ${({ theme }) => theme.spaceSmall + "px"};
  border-bottom: 1px dashed;

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
  const resumeBubble = useContext(ResumeBubble);
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
    <Wrapper style={{ borderColor: resumeBubble.resume.meta.colors.main }}>
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

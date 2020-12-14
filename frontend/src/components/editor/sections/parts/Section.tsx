import React, { ReactNode, useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { FieldInputProps, FieldMetaProps } from "formik";

import Move from "../../../page/Move";
import Management from "./Management";
import SectionEditableTitle from "./SectionEditableTitle";
import SuccessButton from "../../../page/SuccessButton";
import { ReactComponent as ExperienceIcon } from "../icons/Experience.svg";
import { ReactComponent as GalleryIcon } from "../icons/Hiring.svg";
import { ReactComponent as MetaIcon } from "../icons/Design.svg";
import { ReactComponent as InfoIcon } from "../icons/Info.svg";
import { ReactComponent as SkillsIcon } from "../icons/Personal Skills.svg";

import media from "../../../../styled/media";
import { ResumeBubble } from "../../../../bubbles/ResumeBubble";
import { ThemeShape } from "../../../../typings/Theme.typing";

const Wrapper = styled.section`
  background: ${({ theme }) => theme.background};
  border-radius: ${({ theme }) => 2 * theme.spaceBig + "px"};
  margin-bottom: ${({ theme }) => 2 * theme.spaceBig + "px"};
  padding: 0 ${({ theme }) => theme.spaceSmall + "px"};
  display: flex;
  justify-content: center;
  min-height: 400px;
  align-items: center;

  ${media.phone`
    flex-wrap: wrap;
  `};
`;

const About = styled.article`
  padding-right: ${({ theme }) => theme.space + "px"};
  margin-bottom: ${({ theme }) => theme.space + "px"};
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;

  svg {
    width: 100px;
    height: auto;
    display: block;
  }

  ${media.phone`
    padding-right: 0;

    svg {
      width: 75px;
    }
  `};
`;

const Title = styled.h2`
  margin-top: ${({ theme }) => theme.space + "px"};
  color: ${({ theme }) => theme.main};
`;

const Purpose = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.main};
  margin: 0;

  ${media.phone`
    flex: 100%;
  `};
`;

const SectionNavigation = styled.nav`
  display: flex;
  align-self: center;
  margin-top: ${({ theme }) => theme.spaceSmall + "px"};

  svg {
    padding: ${({ theme }) => theme.spaceSmall + "px"};
    border-radius: 50%;
    width: 50px;
  }
`;

const Content = styled.section`
  border-top: solid
    ${({ noBorder, theme }: { noBorder: boolean; theme: ThemeShape }) =>
      noBorder ? 0 : "4px" + theme.main};
  border-radius: ${({ theme }) => theme.spaceSmall / 2 + "px"};
  background-color: ${({ theme }) => theme.white};
  box-shadow: ${({ theme }) => theme.cardShadow};
  transition: ${({ theme }) => theme.cardShadowTransition};
  flex-shrink: 0;
  flex-basis: 375px;

  ${media.tablet`
    flex-basis: 50%;
  `};

  ${media.phone`
    flex: 100%;
  `};
`;

const Children = styled.article`
  padding: ${({ theme }) => theme.spaceSmall + "px"};
  padding-top: ${({ theme }) => theme.space + "px"};
`;

const Footer = styled.div`
  padding-top: ${({ theme }) => theme.space + "px"};
  padding-bottom: ${({ theme }) => theme.space + "px"};
  display: flex;
  flex-wrap: wrap;
  background: ${({ theme }) => theme.gray};
  border-radius: ${({ theme }) => theme.spaceSmall / 2 + "px"};
  padding: ${({ theme }) => theme.spaceSmall + "px"};
`;

export const PhotoDisclaimer = styled(Footer)`
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  font-size: ${({ theme }) => theme.smallFont};
`;

const icons: { [key: string]: ReactNode } = {
  experience: <ExperienceIcon />,
  skills: <SkillsIcon />,
  meta: <MetaIcon />,
  info: <InfoIcon />,
  gallery: <GalleryIcon />,
};

const Section = ({
  children,
  contentForehead,
  title,
  identifier,
  subtitle,
  purpose,
  addFn,
  editableTitle,
}: {
  children: ReactNode | ReactNode[];
  title: string;
  purpose: string;
  identifier: "skills" | "experience" | "info" | "meta" | "gallery" | "";
  contentForehead?: ReactNode;
  addFn?: Function;
  subtitle?: string;
  editableTitle?: FieldInputProps<any> & FieldMetaProps<any>;
}) => {
  const [positionData, setPositionData] = useState<{
    deletable: boolean;
    isFirst: boolean;
    isLast: boolean;
    movable: boolean;
    manageable: boolean;
    column: string;
  }>({
    deletable: false,
    isFirst: false,
    isLast: false,
    movable: false,
    manageable: !["info", "meta", "gallery"].includes(identifier),
    column: "",
  });
  const resumeBubble = useContext(ResumeBubble);
  const {
    resume,
    // updateContent
  } = resumeBubble;
  const { id, meta } = resume;
  const { content, paper } = meta!;
  const { split, full } = content;
  const { layout } = paper;

  useEffect(() => {
    const staticSectionOpen = ["info", "meta", "gallery"].includes(identifier);
    const deletable =
      split.unlisted.includes(identifier) && full.unlisted.includes(identifier);
    const data =
      layout === "split"
        ? {
            deletable,
            isFirst:
              split.leftOrder[0] === identifier ||
              split.rightOrder[0] === identifier,
            isLast:
              split.leftOrder[split.leftOrder.length - 1] === identifier ||
              split.rightOrder[split.rightOrder.length - 1] === identifier,
            movable: !split.unlisted.includes(identifier) && !staticSectionOpen,
            column: split.leftOrder.includes(identifier)
              ? "splitListedLeft"
              : split.rightOrder.includes(identifier)
              ? "splitListedRight"
              : "splitUnlisted",
          }
        : {
            deletable,
            isFirst: full.order[0] === identifier,
            isLast: full.order[full.order.length - 1] === identifier,
            movable: !full.unlisted.includes(identifier) && !staticSectionOpen,
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

  const {
    isFirst,
    isLast,
    movable,
    manageable,
    column,
    deletable,
  } = positionData;

  const urlBase = `/resumes/${id}/section/${identifier}`;

  return (
    <Wrapper>
      <About>
        {icons[identifier]}
        {editableTitle ? (
          <SectionEditableTitle values={editableTitle} title={title} />
        ) : (
          <Title>{title}</Title>
        )}
        <Purpose>{purpose}</Purpose>
        <SectionNavigation>
          {(!isFirst || !isLast) && movable && <Move />}
          {manageable && (
            <Management
              title={title}
              urlBase={urlBase}
              identifier={identifier}
              column={column}
              deletable={deletable}
            />
          )}
        </SectionNavigation>
      </About>
      <Content noBorder={identifier === "info"}>
        {contentForehead}
        <Children>{children}</Children>
        {subtitle && addFn && (
          <Footer>
            <SuccessButton onClick={() => addFn()}>
              Add {subtitle}
            </SuccessButton>
          </Footer>
        )}
      </Content>
    </Wrapper>
  );
};

export default Section;

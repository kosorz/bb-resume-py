import React, { ReactNode, useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { FieldInputProps, FieldMetaProps } from "formik";

import VerticalKnobs from "./VerticalKnobs";
import Management from "./Management";
import SectionEditableTitle from "./SectionEditableTitle";
import SuccessButton from "../../../page/SuccessButton";
import { ReactComponent as ExperienceIcon } from "../icons/Experience.svg";
import { ReactComponent as GalleryIcon } from "../icons/Hiring.svg";
import { ReactComponent as MetaIcon } from "../icons/Design.svg";
import { ReactComponent as InfoIcon } from "../icons/Info.svg";
import { ReactComponent as SkillsIcon } from "../icons/Personal Skills.svg";

import { ResumeBubble } from "../../../../bubbles/ResumeBubble";
import media from "../../../../styled/media";
import axios from "../../../../util/axios";

const Wrapper = styled.section`
  margin-bottom: ${({ theme }) => 2 * theme.spaceBig + "px"};
  padding: 0 ${({ theme }) => theme.spaceSmall + "px"};
  display: flex;
  justify-content: center;
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
  text-align: justify;
  color: ${({ theme }) => theme.main};
  margin: 0;

  ${media.phone`
    flex: 100%;
  `};
`;

const SectionVerticalKnobs = styled(VerticalKnobs)`
  align-self: center;
  margin-top: ${({ theme }) => theme.spaceSmall + "px"};
`;

const Content = styled.section`
  border-radius: ${({ theme }) => theme.spaceSmall / 2 + "px"};
  background-color: ${({ theme }) => theme.white};
  box-shadow: ${({ theme }) => theme.cardShadow};
  transition: ${({ theme }) => theme.cardShadowTransition};
  flex-shrink: 0;
  flex-basis: 400px;

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

const AddWrapper = styled.div`
  padding: ${({ theme }) => theme.spaceSmall + "px"};
  padding-top: 0;

  ${media.phone`
    display: flex;
  `};
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

const icons: { [key: string]: ReactNode } = {
  experience: <ExperienceIcon />,
  skills: <SkillsIcon />,
  meta: <MetaIcon />,
  info: <InfoIcon />,
  gallery: <GalleryIcon />,
};

const Section = ({
  children,
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
  const { resume, updateContent } = resumeBubble;
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

  const move = (dir: string) => {
    axios.post(`${urlBase}/move/${dir}`).then((res) => {
      updateContent(res.data);
    });
  };

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
        {(!isFirst || !isLast) && movable && (
          <SectionVerticalKnobs
            upLabel={`Move\xa0up`}
            downLabel={`Move\xa0down`}
            onUp={() => move("up")}
            onDown={() => move("down")}
            renderUp={!isFirst}
            renderDown={!isLast}
          />
        )}
      </About>
      <Content>
        <Children>{children}</Children>
        {subtitle && addFn && (
          <AddWrapper>
            <SuccessButton onClick={() => addFn()}>
              + Add new {subtitle}
            </SuccessButton>
          </AddWrapper>
        )}
        {manageable && (
          <Footer>
            <Management
              title={title}
              urlBase={urlBase}
              identifier={identifier}
              column={column}
              deletable={deletable}
            />
          </Footer>
        )}
      </Content>
    </Wrapper>
  );
};

export default Section;

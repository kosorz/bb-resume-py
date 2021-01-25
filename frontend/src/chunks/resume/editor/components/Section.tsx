import React, { ReactNode, useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { FieldInputProps, FieldMetaProps } from "formik";

import Management from "./Management";
import Move from "../../../../components/symbols/Move";
import SectionEditableTitle from "./SectionEditableTitle";
import SuccessButton from "../../../../components/SuccessButton";
import Box from "../../../../components/Box";
import Footer from "../../../../components/BoxFooter";

import { ReactComponent as ExperienceIcon } from "../../../../assets/icons/Experience.svg";
import { ReactComponent as SkillsIcon } from "../../../../assets/icons/Personal Skills.svg";
import { ReactComponent as MetaIcon } from "../../../../assets/icons/Design.svg";
import { ReactComponent as InfoIcon } from "../../../../assets/icons/Info.svg";
import { ReactComponent as GalleryIcon } from "../../../../assets/icons/Gallery.svg";

import media from "../../../../util/media";
import { ResumeBubble } from "../../Resume.bubble";
import { ThemeShape } from "../../../../util/theme";

const Wrapper = styled.section`
  background: ${({ theme }) => theme.background};
  border-radius: ${({ theme }) => 2 * theme.spaceBig + "px"};
  margin-bottom: ${({ theme }) => 2 * theme.spaceBig + "px"};
  padding: 0 ${({ theme }) => theme.spaceSmall + "px"};
  display: flex;
  justify-content: center;
  min-height: 400px;
  align-items: center;
  justify-content: space-between;

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

export const Content = styled(Box)`
  border-top: solid
    ${({ noBorder, theme }: { noBorder: boolean; theme: ThemeShape }) =>
      noBorder ? 0 : "4px" + theme.main};

  ${media.tablet`
    flex-basis: 50%;
  `};
`;

const Children = styled.article`
  padding: ${({ theme }) => theme.spaceSmall + "px"} 0
    ${({ theme }) => theme.space + "px"} 0;
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
  className,
}: {
  children: ReactNode | ReactNode[];
  title: string;
  purpose: string;
  identifier: "skills" | "experience" | "info" | "meta" | "gallery" | "";
  contentForehead?: ReactNode;
  addFn?: Function;
  subtitle?: string;
  editableTitle?: FieldInputProps<any> & FieldMetaProps<any>;
  className?: string;
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
  const { resume } = resumeBubble;
  const { id, meta } = resume;
  const { content, paper, template } = meta;
  const { split, full } = content;
  const { layout } = paper;

  useEffect(() => {
    const isStatic = ["info", "meta", "gallery"].includes(identifier);
    const deletable =
      split.unlisted.includes(identifier) && full.unlisted.includes(identifier);
    const data =
      layout === "split" || template === "calm"
        ? {
            deletable,
            isFirst:
              split.mainOrder[0] === identifier ||
              split.secondaryOrder[0] === identifier,
            isLast:
              split.mainOrder[split.mainOrder.length - 1] === identifier ||
              split.secondaryOrder[split.secondaryOrder.length - 1] ===
                identifier,
            movable: !split.unlisted.includes(identifier) && !isStatic,
            column: split.mainOrder.includes(identifier)
              ? "splitListedLeft"
              : split.secondaryOrder.includes(identifier)
              ? "splitListedRight"
              : "splitUnlisted",
          }
        : {
            deletable,
            isFirst: full.order[0] === identifier,
            isLast: full.order[full.order.length - 1] === identifier,
            movable: !full.unlisted.includes(identifier) && !isStatic,
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
    template,
    split.secondaryOrder,
    split.mainOrder,
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
    <Wrapper className={className}>
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
              urlBase={urlBase}
              identifier={identifier}
              column={column}
              deletable={deletable}
            />
          )}
        </SectionNavigation>
      </About>
      <Content noBorder={identifier === "info" && template === "classic"}>
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

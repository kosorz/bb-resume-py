import React, { ReactNode, useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { FieldInputProps, FieldMetaProps } from "formik";

import VerticalKnobs from "./VerticalKnobs";
import Management from "./Management";
import NavItems from "./NavItems";
import SectionEditableTitle from "./SectionEditableTitle";
import Button from "../../../page/Button";
import SuccessButton from "../../../page/SuccessButton";

import { ResumeBubble } from "../../../../bubbles/ResumeBubble";
import media from "../../../../styled/media";
import axios from "../../../../util/axios";

const Wrapper = styled.section`
  display: flex;
`;

export const Content = styled.section`
  margin-bottom: ${({ theme }) => theme.space + "px"};
  padding: ${({ theme }) => theme.space + "px"};
  padding-top: 0;
  border-radius: ${({ theme }) => theme.spaceSmall / 2 + "px"};
  background-color: ${({ theme }) => theme.white};
  /* border: ${({ theme }) => "1px solid" + theme.main}; */
  flex: 70%;

  ${media.phone`
    //@ts-ignore
    padding: ${({ theme }) => theme.spaceSmall + "px"}
  `};
`;

const Title = styled.h2`
  display: inline-block;
`;

const Purpose = styled.p`
  text-align: justify;
  font-size: ${({ theme }) => theme.smallFont};
  margin-top: 0;
  flex: 30%;
  margin-right: ${({ theme }) => theme.space + "px"};
`;

const AddWrapper = styled.div`
  ${media.phone`
    display: flex;
  `};
`;

const Footer = styled.div`
  padding-top: ${({ theme }) => theme.space + "px"};
  margin-top: ${({ theme }) => theme.space + "px"};
  border-top: 3px solid;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Chin = styled(Footer)`
  flex-direction: column;
  border-top: 2px solid;
`;

const NavTitle = styled.h5`
  flex: 100%;
  color: ${({ theme }) => theme.dark};
`;

const SectionVerticalKnobs = styled(VerticalKnobs)`
  flex-wrap: wrap;
  justify-content: flex-start;

  ${media.phone`
    order: -1;  
  `};
`;

const Section = ({
  children,
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
  identifier: "skills" | "experience" | "info" | "meta" | "catalogue" | "";
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
    manageable: !["info", "meta", "catalogue"].includes(identifier),
    column: "",
  });
  const resumeBubble = useContext(ResumeBubble);
  const {
    resume,
    updateContent,
    activeSection,
    setActiveSection,
  } = resumeBubble;
  const { id, meta } = resume;
  const { content, paper, colors } = meta!;
  const { split, full } = content;
  const { layout } = paper;
  const isActive = activeSection === identifier;

  useEffect(() => {
    const staticSectionOpen = ["info", "meta", "catalogue"].includes(
      identifier
    );
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
      <Purpose>{purpose}</Purpose>
      <Content>
        {editableTitle ? (
          <SectionEditableTitle values={editableTitle} title={title} />
        ) : (
          <Title style={{ color: colors.main }}>{title}</Title>
        )}
        {isActive && (
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
              <Chin style={{ borderColor: colors.main }}>
                <NavTitle>Manage {title.toLocaleLowerCase()}:</NavTitle>
                <NavItems>
                  <Management
                    title={title}
                    urlBase={urlBase}
                    identifier={identifier}
                    column={column}
                    deletable={deletable}
                  />
                </NavItems>
              </Chin>
            )}
          </>
        )}
        <Footer style={{ borderColor: colors.main }}>
          <Button onClick={() => setActiveSection(isActive ? "" : identifier)}>
            {isActive
              ? "<<<\xa0Close"
              : (identifier === "catalogue" ? "Open" : "Edit") + "\xa0>>>"}
          </Button>
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
        </Footer>
      </Content>
    </Wrapper>
  );
};

export default Section;

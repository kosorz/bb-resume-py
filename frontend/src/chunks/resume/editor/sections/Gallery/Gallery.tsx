import React, { useContext, useState, ReactNode } from "react";
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import { Collapse } from "react-collapse";
import { useMutation } from "react-query";

import Section from "../../components/Section";
import SuccessButton from "../../../../../components/SuccessButton";
import { ReactComponent as ExperienceIcon } from "../../../../../assets/icons/Experience.svg";
import { ReactComponent as SkillsIcon } from "../../../../../assets/icons/Personal Skills.svg";

import media from "../../../../../util/media";
import axios from "../../../../../util/axios";
import { ResumeBubble } from "../../../Resume.bubble";
import { capitalize } from "../../../../../util/fns";
import { ThemeShape } from "../../../../../util/theme";

const AvailableContent = styled.article`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const Title = styled.h4`
  margin: ${({ theme }) => theme.spaceSmall / 2 + "px"} auto auto;
  border-top-left-radius: ${({ theme }) => theme.spaceSmall / 2 + "px"};
  border-top-right-radius: ${({ theme }) => theme.spaceSmall / 2 + "px"};
  padding-top: ${({ theme }) => theme.spaceSmall + "px"};
  padding-bottom: ${({ theme }) => theme.spaceSmall + "px"};
  background: ${({ active, theme }: { active: boolean; theme: ThemeShape }) =>
    active ? theme.gray : "transparent"};
  border-color: ${({ theme }) => theme.main};
  color: ${({ theme }) => theme.main};
  border-top: ${({ active }: { active: boolean }) =>
    active ? "2px solid" : 0};
  text-align: center;
`;

const Pick = styled.div`
  margin-top: ${({ theme }) => theme.spaceSmall + "px"};
  border-radius: ${({ theme }) => theme.spaceSmall / 2 + "px"};
  flex-basis: ${100 / 3}%;
  order: ${({ order }: { order: number }) => order};
  flex-grow: 0;
  flex-shrink: 0;
  cursor: pointer;

  svg {
    width: ${({ theme }) => theme.sectionNavIconsHeight};
    height: auto;
    display: block;
    margin: auto;
  }
`;

const Description = styled.div`
  background: ${({ theme }) => theme.gray};
  border-radius: ${({ theme }) => theme.spaceSmall / 2 + "px"};
  padding: ${({ theme }) => theme.spaceSmall + "px"};
  color: ${({ theme }) => theme.main};
  flex: 100%;
  text-align: justify;
`;

const AddWrapper = styled.div`
  display: flex;
  margin-top: ${({ theme }) => theme.spaceSmall / 2 + "px"};
  padding: 0 ${({ theme }) => theme.spaceSmall / 2 + "px"};
  justify-content: center;

  ${media.phone`
    flex-wrap: wrap;
  `};
`;

const CollapseWrapper = styled.div`
  order: ${({ order }: { order: number }) => order};
  flex: 100%;
`;

const Gallery = observer(() => {
  const resumeBubble = useContext(ResumeBubble);
  const { resume, addSectionUpdate } = resumeBubble;
  const { experience, skills, meta, id } = resume;
  const { paper, template } = meta;
  const { layout } = paper;

  const [activePickIndex, setActivePick] = useState<number>(0);
  const [activePickIdentifier, setActivePickIdentifier] = useState<
    "" | "skills" | "experience"
  >("");
  const splitListedColumnsSwapped = template === "calm";

  const addSection = useMutation(
    (order: "order" | "mainOrder" | "secondaryOrder") =>
      axios.post(`/parts/${id}/${activePickIdentifier}/${order}`),
    {
      onSuccess: (res, order: "order" | "mainOrder" | "secondaryOrder") => {
        addSectionUpdate(res.data, activePickIdentifier, order);
      },
      onSettled: () => {
        setActivePickIdentifier("");
        setActivePick(0);
      },
    }
  );

  const descriptions: { [key: string]: string } = {
    skills: `Skills there are many variations of passages of Lorem Ipsum available, but 
      the majority have suffered alteration in some form, by injected humour, 
      or randomised words which.`,
    experience: `Experience there are many variations of passages of Lorem Ipsum available, but 
      the majority have suffered alteration in some form, by injected humour, 
      or randomised words which.`,
  };

  const picks: {
    [key: string]: {
      present: boolean;
      icon: ReactNode;
      identifier: "skills" | "experience";
    };
  } = {
    experience: {
      present: !!experience,
      icon: <ExperienceIcon />,
      identifier: "experience",
    },
    skills: {
      present: !!skills,
      icon: <SkillsIcon />,
      identifier: "skills",
    },
  };
  const availablePicks = Object.values(picks).filter((p) => !p.present);

  return (
    <Section
      identifier={"gallery"}
      title={"Available Sections"}
      purpose={`There are many variations of passages of Lorem Ipsum available, but 
    the majority have suffered alteration in some form, by injected humour, 
    or randomised words which.`}
    >
      <AvailableContent>
        {availablePicks.length > 0 ? (
          availablePicks.map((p, i, arr) => {
            const index = i + 1;
            const addToMain = (
              <SuccessButton onClick={() => addSection.mutate("mainOrder")}>
                List in the {splitListedColumnsSwapped ? "right" : "left"}
              </SuccessButton>
            );
            const addToSecondary = (
              <SuccessButton
                style={{
                  order: splitListedColumnsSwapped ? 0 : undefined,
                }}
                onClick={() => addSection.mutate("secondaryOrder")}
              >
                List in the {splitListedColumnsSwapped ? "left" : "right"}
              </SuccessButton>
            );

            const pick = (
              <Pick
                order={index}
                key={"pick-" + p.identifier + index}
                onClick={() => {
                  setActivePick(index === activePickIndex ? 0 : index);
                  setActivePickIdentifier(p.identifier);
                }}
              >
                {p.icon}
                <Title active={activePickIndex === index}>
                  {capitalize(p.identifier)}
                </Title>
              </Pick>
            );

            if (index % 3 === 0 || index === arr.length)
              return (
                <React.Fragment
                  key={"pick-and-description-" + p.identifier + index}
                >
                  {pick}
                  <CollapseWrapper order={index}>
                    <Collapse
                      isOpened={
                        3 * Math.ceil(activePickIndex / 3) === index ||
                        activePickIndex === index ||
                        (activePickIndex === 1 &&
                          arr.length === 2 &&
                          !addSection.isLoading)
                      }
                    >
                      <Description>
                        {descriptions[activePickIdentifier]}
                        <AddWrapper>
                          {layout === "split" || template === "calm" ? (
                            splitListedColumnsSwapped ? (
                              <>
                                {addToSecondary}
                                {addToMain}
                              </>
                            ) : (
                              <>
                                {addToMain}
                                {addToSecondary}
                              </>
                            )
                          ) : (
                            <SuccessButton
                              onClick={() => addSection.mutate("order")}
                            >
                              List
                            </SuccessButton>
                          )}
                        </AddWrapper>
                      </Description>
                    </Collapse>
                  </CollapseWrapper>
                </React.Fragment>
              );

            return pick;
          })
        ) : (
          <Title active={false}>No more sections available</Title>
        )}
      </AvailableContent>
    </Section>
  );
});

export default Gallery;

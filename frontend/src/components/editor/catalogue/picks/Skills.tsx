import React from "react";

import Content from "./parts/Content";
import Pick from "./parts/Pick";
import PickHeadline from "./parts/PickHeadline";
import SubPickHeadline from "./parts/SubPickHeadline";
import styled from "styled-components";

const Skill = styled.p`
  text-decoration: underline;
  padding-right: 5px;
  margin: 0;
`;

const SkillsContent = styled(Content)`
  display: flex;
`;

const Skills = () => (
  <Pick identifier={"skills"}>
    <PickHeadline>Skills</PickHeadline>
    <SubPickHeadline>Soft skills</SubPickHeadline>
    <SkillsContent>
      <Skill>Mediation</Skill>
      <Skill>Conflict solving</Skill>
    </SkillsContent>
  </Pick>
);

export default Skills;

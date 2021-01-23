import React from "react";
import { useQuery } from "react-query";
import axios from "../../util/axios";
import ResumeShape from "../resume/Resume.typing";
import Previewer from "../resume/viewer/components/Previewer";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const Preview = styled.div`
  flex-basis: ${({ theme }) => 7 * theme.spaceBig + "px"};
  height: ${({ theme }) => 1.41 * 7 * theme.spaceBig + "px"};
  display: flex;
  box-shadow: ${({ theme }) => theme.cardShadow};
  transition: ${({ theme }) => theme.cardShadowTransition};
  border-radius: ${({ theme }) => theme.spaceSmall / 2 + "px"};
  border-width: ${({ theme }) => theme.spaceSmall / 4 + "px"};
  border-style: solid;
  border-color: transparent;
  cursor: pointer;
  background: ${({ theme }) => theme.ivory};
  margin-right: ${({ theme }) => theme.spaceSmall + "px"};
  margin-top: ${({ theme }) => theme.spaceSmall + "px"};

  &:hover {
    border-color: ${({ theme }) => theme.activeMain};
  }
`;

const Wrapper = styled.section`
  display: flex;
`;

const Dashboard = () => {
  const history = useHistory();
  const { isLoading, error, data } = useQuery(["me"], () => {
    return axios.get(`/users/me`);
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;

  return (
    <Wrapper>
      {data?.data.resumes
        .sort((r1: ResumeShape, r2: ResumeShape) => r1.id < r2.id)
        .map((r: ResumeShape) => (
          <Preview
            key={r.id + "resume preview"}
            onClick={() => history.push(`/resume/${r.id}`)}
          >
            <Previewer bare={true} data={r} />
          </Preview>
        ))}
    </Wrapper>
  );
};

export default Dashboard;

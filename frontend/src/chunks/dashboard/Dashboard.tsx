import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useQuery } from "react-query";

import Previewer from "../resume/viewer/components/Previewer";
import Loader from "../../components/Loader";

import axios from "../../util/axios";
import ResumeShape from "../resume/Resume.typing";
import media from "../../util/media";

const Wrapper = styled.section`
  display: flex;
  flex-wrap: wrap;

  ${media.phone`
    justify-content: center;
  `};
`;

const Document = styled.div`
  border-radius: ${({ theme }) => theme.spaceSmall / 2 + "px"};
  border-width: ${({ theme }) => theme.spaceSmall / 4 + "px"};
  margin-right: ${({ theme }) => theme.space + "px"};
  margin-top: ${({ theme }) => theme.space + "px"};
  height: ${({ theme }) => 1.41 * 7 * theme.spaceBig + "px"};
  flex-basis: ${({ theme }) => 7 * theme.spaceBig + "px"};
  background: ${({ theme }) => theme.ivory};
  box-shadow: ${({ theme }) => theme.cardShadow};
  transition: ${({ theme }) => theme.cardShadowTransition};
  border-style: solid;
  border-color: transparent;
  cursor: pointer;
  position: relative;

  &:hover {
    border-color: ${({ theme }) => theme.activeMain};
  }
`;

const Dashboard = () => {
  const history = useHistory();
  const [resumes, setResumes] = useState<ResumeShape[]>([]);
  const { isLoading, error } = useQuery(["me"], () => {
    return axios.get(`/users/me/`).then((res) => {
      setResumes(res.data.resumes);
    });
  });

  if (isLoading) return <Loader />;
  if (error) return <div>Error...</div>;

  return (
    <Wrapper>
      {resumes.map((r) => (
        <Document
          key={r.id + "resume preview"}
          onClick={() => history.push(`/resume/${r.id}`)}
        >
          <Previewer bare={true} data={r} />
        </Document>
      ))}
    </Wrapper>
  );
};

export default Dashboard;

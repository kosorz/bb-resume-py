import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useQuery } from "react-query";
import { useMutation } from "react-query";

import Previewer from "../resume/viewer/components/Previewer";
import Loader from "../../components/Loader";
import { Title } from "../resume/editor/Editor";

import axios from "../../util/axios";
import ResumeShape from "../resume/Resume.typing";
import media from "../../util/media";
import PlusIcon from "../../components/symbols/Plus";

const GroupTitle = styled(Title)`
  margin-bottom: 0;
  padding-bottom: 0;
`;

const Group = styled.section`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: ${({ theme }) => theme.space + "px"};

  ${media.phone`
    justify-content: center;
  `};
`;

const Plus = styled(PlusIcon)`
  width: 75px;
  height: 75px;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  border-radius: 50%;
  fill: ${({ theme }) => theme.main};
`;

const Preview = styled.div`
  border-radius: ${({ theme }) => theme.spaceSmall / 2 + "px"};
  border-width: ${({ theme }) => theme.spaceSmall / 4 + "px"};
  margin-right: ${({ theme }) => theme.space + "px"};
  margin-top: ${({ theme }) => theme.space + "px"};
  height: ${({ theme }) => 1.42 * 7 * theme.spaceBig + "px"};
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

const AddNew = styled(Preview)`
  &:hover ${Plus} {
    background: ${({ theme }) => theme.lightGreen};
    fill: ${({ theme }) => theme.green};
  }
`;

const Description = styled.footer`
  border-bottom-left-radius: ${({ theme }) => theme.spaceSmall / 4 + "px"};
  border-bottom-right-radius: ${({ theme }) => theme.spaceSmall / 4 + "px"};
  padding: ${({ theme }) => theme.spaceSmall + "px"};
  height: ${({ theme }) => 1.5 * theme.spaceBig + "px"};
  border-top: 1px solid ${({ theme }) => theme.gray};
  background: ${({ theme }) => theme.ivory};
  color: ${({ theme }) => theme.main};
  position: absolute;
  box-sizing: border-box;
  bottom: 0;
  width: 100%;
  display: flex;
  align-items: center;
`;

const Name = styled.p`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-weight: bold;
  margin: 0;
`;

const Dashboard = () => {
  const history = useHistory();
  const [resumes, setResumes] = useState<ResumeShape[]>([]);
  const { isLoading, error } = useQuery(["me"], () => {
    return axios.get(`/users/me/`).then((res) => {
      setResumes(res.data.resumes);
    });
  });

  const addResume = useMutation(() => axios.post(`/resumes/`, { title: "" }), {
    onSuccess: (res) => {
      setResumes((prev) => [...prev, res.data]);
    },
  });

  if (isLoading) return <Loader />;
  if (error) return <div>Error...</div>;

  return (
    <>
      <GroupTitle>Resumes</GroupTitle>
      <Group>
        {resumes.map((r) => (
          <Preview
            key={r.id + "resume preview"}
            onClick={() => history.push(`/resume/${r.id}`)}
          >
            <Previewer bare={true} data={r} />
            <Description>
              <Name>{r.title}</Name>
            </Description>
          </Preview>
        ))}
        <AddNew onClick={() => addResume.mutate()}>
          <Plus />
          <Description>
            <Name>New</Name>
          </Description>
        </AddNew>
      </Group>
    </>
  );
};

export default Dashboard;

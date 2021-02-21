import React, { useState } from "react";
import styled from "styled-components";
import { useQuery } from "react-query";
import { useMutation } from "react-query";

import Loader from "../../components/Loader";
import { Title } from "../resume/editor/Editor";
import Preview, { Document, Name } from "./components/Preview";

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

const AddNew = styled(Document)`
  &:hover ${Plus} {
    background: ${({ theme }) => theme.lightGreen};
    fill: ${({ theme }) => theme.green};
  }
`;

const Resumes = ({
  resumes,
  setResumes,
}: {
  resumes: ResumeShape[];
  setResumes: Function;
}) => {
  const addResume = useMutation(() => axios.post(`/resumes/`, { title: "" }), {
    onSuccess: (res) => {
      setResumes((prev: ResumeShape[]) => [...prev, res.data]);
    },
  });

  const deleteResume = useMutation((id) => axios.delete(`/resumes/${id}`), {
    onSuccess: (res) => {
      setResumes((prev: ResumeShape[]) =>
        prev.filter((r) => r.id !== res.data)
      );
    },
  });

  return (
    <Group>
      {resumes.map((r) => (
        <Preview
          deleteFn={deleteResume.mutate}
          key={r.id + "document preview"}
          data={r}
        />
      ))}
      <AddNew onClick={() => addResume.mutate()}>
        <Plus />
        <Name>New</Name>
      </AddNew>
    </Group>
  );
};

const Dashboard = () => {
  const [resumes, setResumes] = useState<ResumeShape[]>([]);
  const { isLoading, error } = useQuery(["me"], () => {
    return axios.get(`/users/me/`).then((res) => {
      setResumes(res.data.resumes);
    });
  });

  if (isLoading) return <Loader />;
  if (error) return <div>Error...</div>;

  return (
    <>
      <GroupTitle>Resumes</GroupTitle>
      <Resumes setResumes={setResumes} resumes={resumes} />
    </>
  );
};

export default Dashboard;

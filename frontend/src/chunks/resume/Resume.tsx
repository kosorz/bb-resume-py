import React, { useContext } from "react";
import axios from "../../util/axios";
import { useQuery } from "react-query";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";

import Fonts from "../../assets/fonts/fonts-loader";
import Editor from "./editor/Editor";
import Previewer from "./viewer/components/Previewer";

import { ResumeBubble } from "./ResumeBubble";

const Resume = observer(() => {
  const { id } = useParams();
  const { isLoading, error } = useQuery(
    ["resumes", id],
    () =>
      axios.get(`/resumes/${id}`).then((res) => {
        setResume(res.data);
        return res.data;
      }),
    {
      cacheTime: 0,
    }
  );
  const resumeBubble = useContext(ResumeBubble);
  const { setResume } = resumeBubble;

  if (isLoading) return <div>Loading..</div>;
  if (error) return <div>An error has occurred</div>;

  return (
    <>
      <Fonts />
      <Editor />
      <Previewer bare={false} />
    </>
  );
});

export default Resume;

import React, { useContext } from "react";
import axios from "../../util/axios";
import { useQuery } from "react-query";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";

import Fonts from "../../assets/fonts/fonts-loader";
import Editor from "./editor/Editor";
import Viewer from "./viewer/components/Previewer";

import { ResumeBubble } from "./ResumeBubble";

const Resume = observer(() => {
  const { id } = useParams();
  const { isLoading, error } = useQuery(["resumes", id], () =>
    axios.get(`/resumes/${id}`).then((res) => {
      setResume(res.data);
      return res.data;
    })
  );
  const resumeBubble = useContext(ResumeBubble);
  const { resume, setResume } = resumeBubble;
  const { meta } = resume;

  if (isLoading) return <div>Loading..</div>;
  if (error) return <div>An error has occurred</div>;

  return (
    <>
      <Fonts />
      {meta && <Editor />}
      {meta && <Viewer bare={false} meta={meta} />}
    </>
  );
});

export default Resume;

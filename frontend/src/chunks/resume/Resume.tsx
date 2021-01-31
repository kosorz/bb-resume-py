import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";

import { useQuery } from "react-query";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";

import Fonts from "../../assets/fonts/fonts-loader";
import Editor from "./editor/Editor";
import Previewer from "./viewer/components/Previewer";
import Nav from "./editor/components/Nav";
import Loader from "../../components/Loader";

import { ResumeBubble } from "./Resume.bubble";
import { useWindowWidth } from "../../util/hooks";
import { sizes } from "../../util/media";
import axios from "../../util/axios";

const Wrapper = styled.section`
  position: relative;
`;

const Modes = styled.section`
  display: flex;
`;

const Resume = observer(() => {
  const { id } = useParams();
  const [mode, setMode] = useState<"edit" | "preview">("edit");
  const windowWidth = useWindowWidth();

  const resumeBubble = useContext(ResumeBubble);
  const [savedScrollPosition, setSavedScrollPosition] = useState({
    x: 0,
    y: 0,
  });
  const { setResume } = resumeBubble;
  const isMobile = windowWidth < sizes.tablet;

  useEffect(() => {
    if (isMobile) {
      if (mode === "preview") {
        window.scrollTo(0, 0);
      } else {
        window.scrollTo(savedScrollPosition.x, savedScrollPosition.y);
      }
    }
    // eslint-disable-next-line
  }, [mode]);

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

  if (isLoading) return <Loader />;
  if (error) return <div>An error has occurred</div>;

  return (
    <Wrapper>
      <Fonts />
      <Modes>
        {(!isMobile || mode === "edit") && <Editor />}
        {(!isMobile || mode === "preview") && <Previewer bare={false} />}
      </Modes>
      {isMobile && (
        <Nav
          setMode={setMode}
          setSavedScrollPosition={setSavedScrollPosition}
          mode={mode}
        />
      )}
    </Wrapper>
  );
});

export default Resume;

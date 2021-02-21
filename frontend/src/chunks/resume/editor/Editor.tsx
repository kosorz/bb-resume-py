import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import styled from "styled-components";

import Info from "./sections/Info/Info";
import Column from "./components/Column";
import Meta from "./sections/Meta/Meta";
import Gallery from "./sections/Gallery/Gallery";

import media from "../../../util/media";
import { ResumeBubble } from "../Resume.bubble";

const Wrapper = styled.section`
  flex: 55%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  margin-top: ${({ theme }) => theme.space + "px"};

  button {
    ${media.phone`
    flex: 100%;
    margin-left: 0;
    margin-right: 0;
  `};
  }
`;

export const Title = styled.h2`
  margin: 0;
  margin-bottom: ${({ theme }) => 1.5 * theme.spaceBig + "px"};
  padding: ${({ theme }) => theme.spaceSmall + "px"};
  top: ${({ theme }) => theme.menuHeight + "px"};
  color: ${({ theme }) => theme.main};
  background: ${({ theme }) => theme.background};
  font-size: ${({ theme }) => theme.headingSize};
  z-index: 2;
  max-width: 100%;
  overflow: hidden;
  position: sticky;
`;

const Editor = observer(() => {
  const resumeBubble = useContext(ResumeBubble);
  const { resume } = resumeBubble;
  const { layout } = resume.meta.paper;
  const { template } = resume.meta;

  return (
    <Wrapper>
      <Title>Settings</Title>
      <Gallery />
      <Meta />
      <Info />
      {(layout === "split" || template === "calm") && (
        <>
          <Column order={"mainOrder"} />
          <Column order={"secondaryOrder"} />
        </>
      )}
      {layout === "full" && template === "classic" && (
        <Column order={"order"} />
      )}
      <Column order={"unlisted"} />
    </Wrapper>
  );
});

export default Editor;

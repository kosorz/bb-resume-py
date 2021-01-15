import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import styled from "styled-components";

import Info from "./sections/Info";
import Column from "./sections/parts/Column";
import Meta from "./sections/Meta";
import Gallery from "./sections/Gallery";

import media from "../../styled/media";
import { ResumeBubble } from "../../bubbles/ResumeBubble";

const Wrapper = styled.section`
  flex: 65%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  margin-top: ${({ theme }) => theme.space + "px"};

  /* ${media.tablet`
    display: none;
  `} */
`;

export const Title = styled.h2`
  margin: 0;
  padding: ${({ theme }) => theme.spaceSmall + "px"};
  color: ${({ theme }) => theme.main};
  text-decoration: underline;
  position: sticky;
  z-index: 2;
  overflow: hidden;
  background: ${({ theme }) => theme.background};
  top: ${({ theme }) => theme.menuHeight + "px"};
  max-width: 100%;
`;

const Editor = observer(() => {
  const resumeBubble = useContext(ResumeBubble);
  const { resume } = resumeBubble;
  const { layout } = resume.meta!.paper;
  const { template } = resume.meta!;

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

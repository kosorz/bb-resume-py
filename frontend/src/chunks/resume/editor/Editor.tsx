import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import styled from "styled-components";

import Info from "./sections/Info/Info";
import Column from "./components/Column";
import Meta from "./sections/Meta/Meta";
import Gallery from "./sections/Gallery/Gallery";

import media from "../../../util/media";
import { ResumeBubble } from "../ResumeBubble";

const Wrapper = styled.section`
  flex: 65%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  margin-top: ${({ theme }) => theme.space + "px"};

  /* ${media.tablet`
    display: none;
  `} */

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

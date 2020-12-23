import React from "react";
import { observer } from "mobx-react-lite";
import styled from "styled-components";

import Info from "./sections/Info";
import Column from "./sections/parts/Column";
import Meta from "./sections/Meta";

import { ResumeEditor } from "../../typings/Resume.typing";
import media from "../../styled/media";

const Wrapper = styled.section`
  flex: 67%;
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
  background-image: linear-gradient(
    ${({ theme }) => theme.background},
    ${({ theme }) => theme.background},
    ${({ theme }) => theme.background},
    ${({ theme }) => theme.background},
    transparent
  );
  top: ${({ theme }) => theme.menuHeight + "px"};
`;

const Editor = observer(({ meta }: ResumeEditor) => {
  const { layout } = meta.paper;

  return (
    <Wrapper>
      <Title>Settings</Title>
      <Meta />
      <Info />
      {layout === "split" && (
        <>
          <Column meta={meta} order={"mainOrder"} />
          <Column meta={meta} order={"secondaryOrder"} />
        </>
      )}
      {layout === "full" && <Column meta={meta} order={"order"} />}
      <Column meta={meta} order={"unlisted"} />
    </Wrapper>
  );
});

export default Editor;

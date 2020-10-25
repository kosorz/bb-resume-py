import React from "react";
import styled from "styled-components";
import Navigator from "../../../typings/PageNavigator.typing";

const Wrapper = styled.div`
  display: flex;
  height: 64px;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.black};
`;

const PageIndicator = styled.span`
  margin: 0px 12px;
`;

const PageNavigator = ({
  currentPage,
  numPages,
  onPreviousPage,
  onNextPage,
}: Navigator) => (
  <Wrapper>
    {currentPage !== 1 && <div onClick={onPreviousPage}>{"<"}</div>}
    <PageIndicator>{`Page ${currentPage} / ${numPages}`}</PageIndicator>
    {currentPage !== numPages && <div onClick={onNextPage}>{">"}</div>}
  </Wrapper>
);

export default PageNavigator;

import React from "react";
import styled from "styled-components";
import Spinner from "./Spinner";

const Wrapper = styled.div`
  min-height: ${({ theme }) => 10 * theme.spaceBig + "px"};
  height: 100%;
  width: 100%;
  flex: 100%;
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loader = () => (
  <Wrapper>
    <Spinner />
  </Wrapper>
);

export default Loader;

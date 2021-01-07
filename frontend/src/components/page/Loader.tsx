import React from "react";
import styled, { keyframes } from "styled-components";

const Load = keyframes`
  0% {
    top: 4px;
    height: 32px;
  }
  50%, 100% {
    top: 12px;
    height: 16px;
  }
`;

const Wrapper = styled.div`
  display: inline-block;
  position: relative;
  width: 40px;
  height: 40px;

  div {
    display: inline-block;
    position: absolute;
    left: 4px;
    width: 8px;
    background: ${({ theme }) => theme.main};
    animation-name: ${Load};
    animation-iteration-count: infinite;
    animation-duration: 0.6s;
    animation-timing-function: cubic-bezier(0, 0.5, 0.5, 1);
  }

  div:nth-child(1) {
    left: 4px;
    animation-delay: -0.12s;
  }

  div:nth-child(2) {
    left: 16px;
    animation-delay: -0.06s;
  }

  div:nth-child(3) {
    left: 28px;
    animation-delay: 0;
  }
`;

const Loader = ({ className }: { className?: string }) => (
  <Wrapper className={className}>
    <div></div>
    <div></div>
    <div></div>
  </Wrapper>
);

export default Loader;

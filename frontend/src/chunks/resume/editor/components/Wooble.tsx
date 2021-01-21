import { keyframes } from "styled-components";

export const wobbleOne = keyframes`
  0% {
    transform: rotate(-1deg);
    animation-timing-function: ease-in;
  }
  50% {
    transform: rotate(1.5deg);
    animation-timing-function: ease-out;
  }
`;

export const wobbleTwo = keyframes`
  0% {
    transform: rotate(1deg);
    animation-timing-function: ease-in;
  }
  50% {
    transform: rotate(-1.5deg);
    animation-timing-function: ease-out;
  }
`;

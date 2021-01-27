import styled, { keyframes } from "styled-components";

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);
  border-top: 2px solid;
  border-right: 2px solid;
  border-bottom: 2px solid;
  border-left: 4px solid;
  border-color: ${({ theme }) => theme.activeMain};
  background: transparent;
  width: ${({ theme }) => 1.2 * theme.spaceBig + "px"};
  height: ${({ theme }) => 1.2 * theme.spaceBig + "px"};
  border-radius: 50%;
`;

export default Spinner;

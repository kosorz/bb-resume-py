import styled from "styled-components";
import { ReactComponent as LeftIcon } from "./icons/Left.svg";

const Left = styled(LeftIcon)`
  &:hover {
    background: ${({ theme }) => theme.lightMain};
    fill: ${({ theme }) => theme.main};
  }
`;

export default Left;

import styled from "styled-components";
import { ReactComponent as RightIcon } from "./icons/Right.svg";

const Right = styled(RightIcon)`
  &:hover {
    background: ${({ theme }) => theme.lightMain};
    fill: ${({ theme }) => theme.main};
  }
`;

export default Right;

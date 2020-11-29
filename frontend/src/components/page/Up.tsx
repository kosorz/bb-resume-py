import styled from "styled-components";
import { ReactComponent as UpIcon } from "./icons/Up.svg";

const Up = styled(UpIcon)`
  &:hover {
    background: ${({ theme }) => theme.lightMain};
    fill: ${({ theme }) => theme.main};
  }
`;

export default Up;

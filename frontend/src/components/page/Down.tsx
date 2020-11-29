import styled from "styled-components";
import { ReactComponent as DownIcon } from "./icons/Down.svg";

const Down = styled(DownIcon)`
  &:hover {
    background: ${({ theme }) => theme.lightMain};
    fill: ${({ theme }) => theme.main};
  }
`;

export default Down;

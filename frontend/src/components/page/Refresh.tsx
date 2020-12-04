import styled from "styled-components";
import { ReactComponent as RefreshIcon } from "./icons/Refresh.svg";

const Refresh = styled(RefreshIcon)`
  fill: ${({ theme }) => theme.white};

  &:hover {
    background: ${({ theme }) => theme.lightGreen};
    fill: ${({ theme }) => theme.green};
    cursor: pointer;
  }
`;

export default Refresh;

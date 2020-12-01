import styled from "styled-components";
import { ReactComponent as HideIcon } from "./icons/Hide.svg";

const Hide = styled(HideIcon)`
  &:hover {
    background: ${({ theme }) => theme.lightOrange};
    fill: ${({ theme }) => theme.orange};
    cursor: pointer;
  }
`;

export default Hide;

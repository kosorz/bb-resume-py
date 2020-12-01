import styled from "styled-components";
import { ReactComponent as MoveIcon } from "./icons/Move.svg";

const Move = styled(MoveIcon)`
  &:hover {
    background: ${({ theme }) => theme.lightMain};
    fill: ${({ theme }) => theme.main};
    cursor: grab;
  }
`;

export default Move;

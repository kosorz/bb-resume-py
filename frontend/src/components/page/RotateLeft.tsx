import styled from "styled-components";
import { ReactComponent as RotateLeftIcon } from "./icons/RotateLeft.svg";
import { SortableHandle } from "react-sortable-hoc";

const RotateLeft = styled(RotateLeftIcon)`
  &:hover {
    background: ${({ theme }) => theme.lightMain};
    fill: ${({ theme }) => theme.main};
    cursor: grab;
  }
`;

export default SortableHandle(RotateLeft);

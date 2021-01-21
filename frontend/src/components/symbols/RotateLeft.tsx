import styled from "styled-components";
import { ReactComponent as RotateLeftIcon } from "../../assets/icons/RotateLeft.svg";

const RotateLeft = styled(RotateLeftIcon)`
  &:hover {
    background: ${({ theme }) => theme.lightMain};
    fill: ${({ theme }) => theme.main};
    cursor: grab;
  }
`;

export default RotateLeft;

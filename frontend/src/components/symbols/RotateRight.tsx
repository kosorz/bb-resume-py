import styled from "styled-components";
import { ReactComponent as RotateRightIcon } from "../../assets/icons/RotateRight.svg";

const RotateRight = styled(RotateRightIcon)`
  &:hover {
    background: ${({ theme }) => theme.lightMain};
    fill: ${({ theme }) => theme.main};
    cursor: grab;
  }
`;

export default RotateRight;

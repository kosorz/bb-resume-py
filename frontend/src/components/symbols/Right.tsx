import styled from "styled-components";
import { ReactComponent as RightIcon } from "../../assets/icons/Right.svg";

const Right = styled(RightIcon)`
  &:hover {
    background: ${({ theme }) => theme.lightMain};
    fill: ${({ theme }) => theme.main};
    cursor: pointer;
  }
`;

export default Right;

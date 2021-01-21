import styled from "styled-components";
import { ReactComponent as LeftIcon } from "../../assets/icons/Left.svg";

const Left = styled(LeftIcon)`
  &:hover {
    background: ${({ theme }) => theme.lightMain};
    fill: ${({ theme }) => theme.main};
    cursor: pointer;
  }
`;

export default Left;

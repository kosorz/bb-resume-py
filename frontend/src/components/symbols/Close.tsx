import styled from "styled-components";
import { ReactComponent as CloseIcon } from "../../assets/icons/Close.svg";

const Close = styled(CloseIcon)`
  &:hover {
    background: ${({ theme }) => theme.lightMain};
    fill: ${({ theme }) => theme.main};
    cursor: pointer;
  }
`;

export default Close;

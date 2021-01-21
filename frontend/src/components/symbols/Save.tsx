import styled from "styled-components";
import { ReactComponent as SaveIcon } from "../../assets/icons/Save.svg";

const Save = styled(SaveIcon)`
  fill: ${({ theme }) => theme.white};

  &:hover {
    background: ${({ theme }) => theme.lightGreen};
    fill: ${({ theme }) => theme.green};
    cursor: pointer;
  }
`;

export default Save;

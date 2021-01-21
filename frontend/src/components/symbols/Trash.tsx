import styled from "styled-components";
import { ReactComponent as TrashIcon } from "../../assets/icons/Trash.svg";

const Trash = styled(TrashIcon)`
  &:hover {
    background: ${({ theme }) => theme.lightRed};
    fill: ${({ theme }) => theme.red};
    cursor: pointer;
  }
`;

export default Trash;

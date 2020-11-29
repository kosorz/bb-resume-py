import styled from "styled-components";
import { ReactComponent as TrashIcon } from "./icons/Trash.svg";

const Trash = styled(TrashIcon)`
  &:hover {
    background: ${({ theme }) => theme.lightRed};
    fill: ${({ theme }) => theme.red};
  }
`;

export default Trash;

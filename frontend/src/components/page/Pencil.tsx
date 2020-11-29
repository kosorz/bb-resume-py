import styled from "styled-components";
import { ReactComponent as PencilIcon } from "./icons/Pencil.svg";

const Pencil = styled(PencilIcon)`
  &:hover {
    background: ${({ theme }) => theme.lightMain};
    fill: ${({ theme }) => theme.main};
  }
`;

export default Pencil;

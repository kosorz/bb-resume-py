import styled from "styled-components";
import { ReactComponent as PencilIcon } from "../../assets/icons/Pencil.svg";

const Pencil = styled(PencilIcon)`
  &:hover {
    background: ${({ theme }) => theme.lightMain};
    fill: ${({ theme }) => theme.main};
    cursor: pointer;
  }
`;

export default Pencil;

import styled from "styled-components";
import { ReactComponent as ShowIcon } from "./icons/Show.svg";

const Show = styled(ShowIcon)`
  &:hover {
    background: ${({ theme }) => theme.lightGreen};
    fill: ${({ theme }) => theme.green};
    cursor: pointer;
  }
`;

export default Show;

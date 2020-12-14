import styled from "styled-components";
import { ReactComponent as SplitIcon } from "./icons/Split.svg";

const Split = styled(SplitIcon)`
  fill: ${({ theme }) => theme.main};
  align-self: center;
  width: 35px;
  height: 35px;
  margin: auto;
`;

export default Split;

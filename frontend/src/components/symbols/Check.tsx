import styled from "styled-components";
import { ReactComponent as CheckIcon } from "../../assets/icons/Check.svg";

const Check = styled(CheckIcon)`
  fill: ${({ theme }) => theme.activeMain};
  border-radius: 50%;
`;

export default Check;

import styled from "styled-components";
import { ReactComponent as FullIcon } from "../../assets/icons/Full.svg";

const Full = styled(FullIcon)`
  fill: ${({ theme }) => theme.main};
  align-self: center;
  width: 35px;
  height: 35px;
  margin: auto;
`;

export default Full;

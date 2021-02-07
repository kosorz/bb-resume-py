import styled from "styled-components";
import media from "../util/media";

export const Box = styled.section`
  border-top: solid ${({ theme }) => "4px" + theme.main};
  border-radius: ${({ theme }) => theme.spaceSmall / 2 + "px"};
  background-color: ${({ theme }) => theme.white};
  box-shadow: ${({ theme }) => theme.cardShadow};
  transition: ${({ theme }) => theme.cardShadowTransition};
  flex-basis: 330px;
  flex-shrink: 0;

  ${media.phone`
    flex: 100%;
  `};
`;

export default Box;

import styled from "styled-components";

const PickHeadline = styled.h2`
  border-bottom: 2px solid;
  font-weight: 700;
  text-transform: uppercase;
  margin: 0;
  margin-bottom: ${({ theme }) => theme.spaceSmall + "px"};
  padding-bottom: ${({ theme }) => theme.spaceSmall / 2 + "px"};
`;

export default PickHeadline;

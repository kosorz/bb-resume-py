import styled from "styled-components";

const Footer = styled.div`
  padding-top: ${({ theme }) => theme.space + "px"};
  padding-bottom: ${({ theme }) => theme.space + "px"};
  display: flex;
  flex-wrap: wrap;
  background: ${({ theme }) => theme.gray};
  border-radius: ${({ theme }) => theme.spaceSmall / 2 + "px"};
  padding: ${({ theme }) => theme.spaceSmall + "px"};
`;

export default Footer;

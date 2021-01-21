import styled from "styled-components";

const Menu = styled.section`
  background: ${({ theme }) => theme.white};
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 3;
  height: ${({ theme }) => theme.menuHeight + "px"};
  box-shadow: ${({ theme }) => theme.cardShadow};
  transition: ${({ theme }) => theme.cardShadowTransition};
`;

export default Menu;

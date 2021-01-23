import React from "react";
import styled from "styled-components";
import { useHistory, useLocation } from "react-router-dom";

import LinkButton from "../../components/LinkButton";
import Button from "../../components/Button";

import { ReactComponent as HiringIcon } from "../../assets/icons/Ace.svg";

import { isAuthenticated } from "../../util/auth";
import { ThemeShape } from "../../util/theme";
import media from "../../util/media";

const Logo = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    transform: scale(1.01);
    transition: transform 0.5s;
  }
`;

const Graphic = styled(HiringIcon)`
  width: auto;
  height: ${({ theme }) => 1.5 * theme.numericBiggerFont + "px"};
  fill: ${({ theme }) => theme.complementary};

  ${Logo}:hover & {
    filter: contrast(60%);
  }
`;

const Name = styled.span`
  color: ${({ theme }) => theme.main};
  font-weight: bold;
  display: flex;
  font-size: 16px;
  margin-left: -2px;

  ${Logo}:hover & {
    color: ${({ theme }) => theme.activeMain};
  }
`;

const Wrapper = styled.section`
  background: ${({
    theme,
    isAuthenticated,
  }: {
    theme: ThemeShape;
    isAuthenticated: boolean;
  }) => (isAuthenticated ? theme.white : "transparent")};
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 3;
  min-height: ${({ theme }: { theme: ThemeShape }) => theme.menuHeight + "px"};
  box-shadow: ${({
    theme,
    isAuthenticated,
  }: {
    theme: ThemeShape;
    isAuthenticated: boolean;
  }) => (isAuthenticated ? theme.cardShadow : "none")};
  transition: ${({
    theme,
    isAuthenticated,
  }: {
    theme: ThemeShape;
    isAuthenticated: boolean;
  }) => (isAuthenticated ? theme.cardShadowTransition : "none")};
  display: flex;
`;

const Content = styled.nav`
  flex: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${({ theme }) => 3 * theme.spaceBig + "px"};

  ${media.tablet`
    padding: 0 ${({ theme }: { theme: ThemeShape }) => 2 * theme.space + "px"};
  `};

  ${media.phone`
    padding: 0 ${({ theme }: { theme: ThemeShape }) => theme.spaceSmall + "px"};
  `};
`;

const AuthAccess = styled.div``;

const Menu = () => {
  const history = useHistory();
  const location = useLocation();

  return (
    <Wrapper isAuthenticated={isAuthenticated()}>
      <Content>
        <Logo onClick={() => history.push("/dashboard")}>
          <Graphic />
          <Name>ceResu.me</Name>
        </Logo>
        {isAuthenticated() ? (
          <LinkButton onClick={() => history.push("/logout")}>
            Logout
          </LinkButton>
        ) : (
          <AuthAccess>
            <LinkButton
              disabled={location.pathname === "/login"}
              onClick={() => history.push("/login")}
            >
              Log in
            </LinkButton>
            <Button
              disabled={location.pathname === "/register"}
              onClick={() => history.push("/register")}
            >
              Get started
            </Button>
          </AuthAccess>
        )}
      </Content>
    </Wrapper>
  );
};

export default Menu;

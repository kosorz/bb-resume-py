import React, { ReactNode } from "react";
import styled from "styled-components";

import Pencil from "../../../../components/symbols/Pencil";
import Show from "../../../../components/symbols/Show";
import { ThemeShape } from "../../../../util/theme";

const Wrapper = styled.nav`
  box-shadow: ${({ theme }) => theme.cardShadow};
  transition: ${({ theme }) => theme.cardShadowTransition};
  border-top: solid 2px ${({ theme }) => theme.main};
  background: ${({ theme }) => theme.ivory};
  bottom: ${({ theme }) => theme.spaceSmall + "px"};
  height: ${({ theme }) => theme.navHeight + "px"};
  width: ${({ theme }) => theme.navWidth + "px"};
  margin-left: -${({ theme }) => theme.navWidth / 2 + "px"};
  border-radius: ${({ theme }) => theme.spaceSmall / 2 + "px"};
  position: fixed;
  display: flex;
  left: 50%;
  z-index: 3;
`;

const Action = styled.div`
  border-radius: ${({ theme }) => theme.spaceSmall / 2 + "px"};
  color: ${({ isActive, theme }: { isActive: boolean; theme: ThemeShape }) =>
    isActive ? theme.main : theme.darkGray};
  font-weight: ${({ isActive }: { isActive: boolean }) =>
    isActive ? "bold" : "normal"};
  font-size: ${({ theme }) => theme.smallFont};
  flex: 50%;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  display: flex;

  & + & {
    border-left: 1px solid ${({ theme }) => theme.gray};
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  > svg {
    fill: ${({ isActive, theme }: { isActive: boolean; theme: ThemeShape }) =>
      isActive ? theme.activeMain : theme.darkGray};
    border-radius: 50%;
    background: transparent;
  }

  > span {
    border-color: ${({
      isActive,
      theme,
    }: {
      isActive: boolean;
      theme: ThemeShape;
    }) => (isActive ? theme.activeMain : "transparent")};
    border-radius: ${({ theme }) => theme.spaceSmall / 4 + "px"};
    padding: 0 ${({ theme }) => theme.spaceSmall / 2 + "px"};
    display: block;
    border-top: 1px solid;
  }

  &:hover {
    cursor: pointer;
    font-weight: bold;
    color: ${({ theme }) => theme.main};

    > svg {
      fill: ${({ theme }: { theme: ThemeShape }) => theme.activeMain};
      background: transparent;
    }

    > span {
      border-color: ${({ theme }) => theme.activeMain};
    }
  }
`;

const NavAction = ({
  icon,
  title,
  mode,
  ownMode,
  setMode,
}: {
  icon: ReactNode;
  title: string;
  mode: "edit" | "preview";
  ownMode: "edit" | "preview";
  setMode: Function;
}) => (
  <Action isActive={mode === ownMode} onClick={() => setMode(ownMode)}>
    {icon}
    <span>{title}</span>
  </Action>
);

const Nav = ({
  setMode,
  mode,
}: {
  setMode: Function;
  mode: "edit" | "preview";
}) => (
  <Wrapper>
    <NavAction
      mode={mode}
      ownMode={"edit"}
      icon={<Pencil />}
      title={"Edit"}
      setMode={setMode}
    />
    <NavAction
      mode={mode}
      ownMode={"preview"}
      icon={<Show />}
      title={"Preview"}
      setMode={setMode}
    />
  </Wrapper>
);

export default Nav;

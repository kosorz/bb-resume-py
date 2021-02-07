import React, { ReactNode } from "react";
import styled from "styled-components";
import useWindowScrollPosition from "@rehooks/window-scroll-position";

import Pencil from "../../../../components/symbols/Pencil";
import Show from "../../../../components/symbols/Show";
import { ThemeShape } from "../../../../util/theme";
import { useDebounce } from "../../../../util/hooks";

const Wrapper = styled.nav`
  box-shadow: ${({ theme }) => theme.cardShadow};
  transition: ${({ theme }) => theme.cardShadowTransition};
  border-left: solid 2px ${({ theme }) => theme.main};
  background: ${({ theme }) => theme.white};
  top: ${({ theme }) => theme.spaceBig * 3 + "px"};
  height: ${({ theme }) => theme.navHeight + "px"};
  width: ${({ theme }) => theme.navWidth + "px"};
  border-top-left-radius: ${({ theme }) => theme.spaceSmall / 2 + "px"};
  border-bottom-left-radius: ${({ theme }) => theme.spaceSmall / 2 + "px"};
  position: fixed;
  display: flex;
  right: 0;
  z-index: 3;
  flex-direction: column;
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
    border-top: 1px solid ${({ theme }) => theme.gray};
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }

  > svg {
    fill: ${({ isActive, theme }: { isActive: boolean; theme: ThemeShape }) =>
      isActive ? theme.activeMain : theme.darkGray};
    border-radius: 50%;
    background: transparent;
  }

  &:hover {
    cursor: pointer;
    font-weight: bold;
    color: ${({ theme }) => theme.main};

    > svg {
      fill: ${({ theme }: { theme: ThemeShape }) => theme.activeMain};
      background: transparent;
    }
  }
`;

const NavAction = ({
  icon,
  mode,
  ownMode,
  setMode,
}: {
  icon: ReactNode;
  mode: "edit" | "preview";
  ownMode: "edit" | "preview";
  setMode: Function;
}) => {
  return (
    <Action
      isActive={mode === ownMode}
      onClick={() => {
        setMode(ownMode);
      }}
    >
      {icon}
    </Action>
  );
};

const Nav = ({
  setMode,
  mode,
  setSavedScrollPosition,
}: {
  setMode: Function;
  mode: "edit" | "preview";
  setSavedScrollPosition: Function;
}) => {
  const scrollPosition = useWindowScrollPosition();
  const debouncedScrollPosition = useDebounce(scrollPosition, 300);

  return (
    <Wrapper>
      <NavAction
        mode={mode}
        ownMode={"edit"}
        icon={<Pencil />}
        setMode={setMode}
      />
      <NavAction
        mode={mode}
        ownMode={"preview"}
        icon={<Show />}
        setMode={(mode: "preview") => {
          setSavedScrollPosition(debouncedScrollPosition);
          setMode(mode);
        }}
      />
    </Wrapper>
  );
};

export default Nav;

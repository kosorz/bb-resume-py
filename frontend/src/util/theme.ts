export type ThemeShape = {
  background: string;
  gray: string;
  darkGray: string;
  white: string;

  red: string;
  ivory: string;
  lightRed: string;
  green: string;
  lightGreen: string;
  orange: string;
  lightOrange: string;

  main: string;
  activeMain: string;
  lightMain: string;

  complementary: string;

  smallFont: string;
  mediumFont: string;
  biggerFont: string;
  numericSmallFont: number;
  numericBiggerFont: number;

  menuHeight: number;
  navHeight: number;
  navWidth: number;
  spaceSmall: number;
  space: number;
  spaceBig: number;

  cardShadow: string;
  cardShadowTransition: string;
};

const theme: ThemeShape = {
  background: "#f4f7fe",
  gray: "#f6f6f6",
  darkGray: "#8c8c8c",
  white: "#FFF",

  red: "#F22300",
  ivory: "#fffff0",
  lightRed: "#fff1f0",
  green: "#389e0d",
  lightGreen: "#f6ffed",
  orange: "#faad14",
  lightOrange: "#ffe7ba",

  main: "#102f6e",
  activeMain: "#16429B",
  lightMain: "#e9effc",

  complementary: "#6E4F10",

  smallFont: "12px",
  mediumFont: "13px",
  biggerFont: "14px",
  numericSmallFont: 12,
  numericBiggerFont: 14,

  menuHeight: 65,
  navHeight: 50,
  navWidth: 300,
  spaceSmall: 10,
  space: 20,
  spaceBig: 30,

  cardShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
  cardShadowTransition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
};

export default theme;

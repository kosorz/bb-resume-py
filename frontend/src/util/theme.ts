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

  copySize: string;
  subheadingSize: string;
  headingSize: string;
  numericBiggerFont: number;

  menuHeight: number;
  navHeight: number;
  navWidth: number;
  spaceSmall: number;
  space: number;
  spaceBig: number;
  sectionNavIconsHeight: string;

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

  copySize: "15px",
  subheadingSize: "20px",
  headingSize: "26px",
  numericBiggerFont: 15,

  menuHeight: 65,
  navHeight: 90,
  navWidth: 40,
  spaceSmall: 10,
  space: 20,
  spaceBig: 30,
  sectionNavIconsHeight: "75px",

  cardShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
  cardShadowTransition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
};

export default theme;

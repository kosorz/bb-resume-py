export type ColorsShape = {
  main: string;
  secondary: string;
};

export type FontSizeShape = {
  small: 10 | 11 | 12;
  main: 13 | 14;
  medium: 15 | 16 | 17;
  large: 20 | 21 | 22 | 23 | 24;
  big: 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42;
};

export type PaperShape = {
  size: "A4";
  space: 40 | 45 | 50 | 55 | 60;
  layout: "split" | "full";
};

export type ContentShape = {
  split: {
    unlisted: string[];
    leftOrder: string[];
    rightOrder: string[];
  };
  full: {
    unlisted: string[];
    order: string[];
  };
};

export type MetaShape = {
  colors: ColorsShape;
  fontSize: FontSizeShape;
  fontFamily: "Roboto" | "Rubik" | "Exo";
  background:
    | ""
    | "Crossing"
    | "Hectagons"
    | "Net"
    | "Waves"
    | "Triangles"
    | "Wood"
    | "X-parts";
  paper: PaperShape;
  content: ContentShape;
};

export default MetaShape;

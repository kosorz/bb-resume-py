export type ColorsShape = {
  main: string;
  secondary: string;
};

export type FontSizeShape = {
  small: 10 | 11;
  main: 13 | 14;
  medium: 16 | 17;
  large: 24 | 22 | 20;
  big: 34 | 38 | 42;
};

export type PaperShape = {
  size: "A4";
  space: 40 | 50 | 60;
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
  fontFamily: string;
  paper: PaperShape;
  content: ContentShape;
};

export default MetaShape;

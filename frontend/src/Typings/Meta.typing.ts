type MetaColors = {
  main: string;
  secondary: string;
};

type MetaFontSize = {
  small: 10 | 11;
  main: 13 | 14;
  medium: 16 | 17;
  large: 24 | 22 | 20;
  big: 34 | 38 | 42;
};

type MetaPaper = {
  size: "A4";
  space: 40 | 50 | 60;
  layout: "split" | "full";
};

export type MetaContent = {
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

type ResumeMetaShape = {
  colors: MetaColors;
  fontSize: MetaFontSize;
  fontFamily: string;
  paper: MetaPaper;
  content: MetaContent;
};

export default ResumeMetaShape;

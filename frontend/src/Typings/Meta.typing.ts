type ResumeMetaShape = {
  colors: {
    main: string;
    secondary: string;
  };
  fontSize: {
    small: 10 | 11;
    main: 13 | 14;
    medium: 16 | 17;
    large: 24 | 22 | 20;
    big: 34 | 38 | 42;
  };
  fontFamily: string;
  paper: {
    size: "A4";
    space: 40 | 50 | 60;
    layout: "split" | "full";
  };
  content: {
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
};

export default ResumeMetaShape;

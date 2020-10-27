type ThemeShape = {
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
  fontFamily: {
    light: "Roboto-Light";
    normal: "Roboto-Regular";
    medium: "Roboto-Medium";
    bold: "Roboto-Bold";
    black: "Roboto-Black";
  };
  paper: {
    size: "A4";
    space: 40 | 50 | 60;
  };
};

export default ThemeShape;

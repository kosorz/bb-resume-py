type ThemeShape = {
  colors: {
    main: string;
    secondary: string;
  };
  fontSize: {
    small: 10 | 11 | 12;
    main: 13 | 14 | 15;
    large: 24 | 22 | 18;
    big: 34 | 38 | 42;
  };
  fontFamily: {
    light: "Roboto-Light";
    normal: "Roboto-Regular";
    bold: "Roboto-Bold";
  };
  paper: {
    size: "A4";
    space: 40 | 50 | 60;
  };
};

export default ThemeShape;

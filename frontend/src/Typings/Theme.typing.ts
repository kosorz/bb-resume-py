type ThemeShape = {
  colors: {
    main: string;
    secondary: string;
  };
  fontSize: {
    small: 10 | 11 | 12;
    main: 13 | 14 | 15;
    big: 30 | 32 | 34;
  };
  fontWeight: {
    light: "thin" | "ultralight" | "extralight" | "light";
    normal: "normal" | "medium";
    bold: "semibold" | "bold" | "ultrabold" | "extrabold";
  };
  paper: {
    size: "A4";
    margin: 20 | 25 | 30;
  };
};

export default ThemeShape;

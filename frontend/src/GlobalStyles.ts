import { createGlobalStyle } from "styled-components";
import { ThemeShape } from "./util/theme";

export const ResetStyles = createGlobalStyle`
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    vertical-align: baseline;
    font-family: 'Raleway', 'Montserrat', sans-serif;
  }
`;

const GlobalStyles = createGlobalStyle`
  body {
    background-color: #f4f7fe;
    font-size: ${({ theme }: { theme: ThemeShape }) => theme.copySize};
  }

  input,
  textarea {
    border: 1px solid #e8e8e8;
    font-family: 'Raleway', 'Montserrat', sans-serif;
    font-size: ${({ theme }: { theme: ThemeShape }) => theme.copySize};
  }

  svg {
    fill: #595959;
  }

  .ReactCollapse--collapse {
    transition: ease height 500ms;
  }

  .react-pdf__message {
    display: none;
  }
`;

export default GlobalStyles;

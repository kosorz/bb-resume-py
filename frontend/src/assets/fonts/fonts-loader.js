import { createGlobalStyle } from "styled-components";
import { Font } from "@react-pdf/renderer";

import RobotoBold from "./Roboto-Bold.ttf";
import RobotoRegular from "./Roboto-Regular.ttf";
import RobotoBlack from "./Roboto-Black.ttf";
import RubikBold from "./Rubik-Bold.ttf";
import RubikRegular from "./Rubik-Regular.ttf";
import RubikBlack from "./Rubik-Black.ttf";
import ExoBold from "./Exo-Bold.ttf";
import ExoRegular from "./Exo-Regular.ttf";
import ExoBlack from "./Exo-Black.ttf";
import ChivoBold from "./Chivo-Bold.ttf";
import ChivoRegular from "./Chivo-Regular.ttf";
import ChivoBlack from "./Chivo-Black.ttf";
import OswaldBold from "./Oswald-Bold.ttf";
import OswaldRegular from "./Oswald-Regular.ttf";
import OswaldBlack from "./Oswald-Black.ttf";
import LatoBold from "./Lato-Bold.ttf";
import LatoRegular from "./Lato-Regular.ttf";
import LatoBlack from "./Lato-Black.ttf";
import BitterBold from "./Bitter-Bold.ttf";
import BitterRegular from "./Bitter-Regular.ttf";
import BitterBlack from "./Bitter-Black.ttf";

export default createGlobalStyle`
    @font-face {
        font-family: 'Roboto-Prev';
        src: local('Roboto-Prev'), url(${RobotoRegular}) format('truetype');
        font-style: normal;
    }    
    
    @font-face {
        font-family: 'Rubik-Prev';
        src: local('Rubik-Prev'), url(${RubikRegular}) format('truetype');
        font-style: normal;
    }    
    
    @font-face {
        font-family: 'Exo-Prev';
        src: local('Exo-Prev'), url(${ExoRegular}) format('truetype');
        font-style: normal;
    }    
    
    @font-face {
        font-family: 'Chivo-Prev';
        src: local('Chivo-Prev'), url(${ChivoRegular}) format('truetype');
        font-style: normal;
    }    
    
    @font-face {
        font-family: 'Oswald-Prev';
        src: local('Oswald-Prev'), url(${OswaldRegular}) format('truetype');
        font-style: normal;
    }    
    
    @font-face {
        font-family: 'Lato-Prev';
        src: local('Lato-Prev'), url(${LatoRegular}) format('truetype');
        font-style: normal;
    }    
    
    @font-face {
        font-family: 'Bitter-Prev';
        src: local('Bitter-Prev'), url(${BitterRegular}) format('truetype');
        font-style: normal;
    }
`;

const fonts = [
  { family: "Roboto-Regular", src: RobotoRegular },
  { family: "Roboto-Bold", src: RobotoBold },
  { family: "Roboto-Black", src: RobotoBlack },
  { family: "Rubik-Regular", src: RubikRegular },
  { family: "Rubik-Bold", src: RubikBold },
  { family: "Rubik-Black", src: RubikBlack },
  { family: "Exo-Regular", src: ExoRegular },
  { family: "Exo-Bold", src: ExoBold },
  { family: "Exo-Black", src: ExoBlack },
  { family: "Chivo-Regular", src: ChivoRegular },
  { family: "Chivo-Bold", src: ChivoBold },
  { family: "Chivo-Black", src: ChivoBlack },
  { family: "Oswald-Regular", src: OswaldRegular },
  { family: "Oswald-Bold", src: OswaldBold },
  { family: "Oswald-Black", src: OswaldBlack },
  { family: "Lato-Regular", src: LatoRegular },
  { family: "Lato-Bold", src: LatoBold },
  { family: "Lato-Black", src: LatoBlack },
  { family: "Bitter-Regular", src: BitterRegular },
  { family: "Bitter-Bold", src: BitterBold },
  { family: "Bitter-Black", src: BitterBlack },
];

export const loadFonts = () => {
  fonts.map((f) =>
    Font.register({
      ...f,
      format: "truetype",
    })
  );
  Font.registerEmojiSource({
    format: "png",
    url: "https://twemoji.maxcdn.com/2/72x72/",
  });
};

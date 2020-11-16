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
import MontserratBold from "./Montserrat-Bold.ttf";
import MontserratRegular from "./Montserrat-Regular.ttf";
import MontserratBlack from "./Montserrat-Black.ttf";
import OswaldBold from "./Oswald-Bold.ttf";
import OswaldRegular from "./Oswald-Regular.ttf";
import OswaldBlack from "./Oswald-Black.ttf";
import LatoBold from "./Lato-Bold.ttf";
import LatoRegular from "./Lato-Regular.ttf";
import LatoBlack from "./Lato-Black.ttf";
import BitterBold from "./Bitter-Bold.ttf";
import BitterRegular from "./Bitter-Regular.ttf";
import BitterBlack from "./Bitter-Black.ttf";

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
  { family: "Montserrat-Regular", src: MontserratRegular },
  { family: "Montserrat-Bold", src: MontserratBold },
  { family: "Montserrat-Black", src: MontserratBlack },
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

const loadFonts = () => {
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

export default loadFonts;

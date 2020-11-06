import { Font } from "@react-pdf/renderer";

import RobotoBold from "./Roboto-Bold.ttf";
import RobotoRegular from "./Roboto-Regular.ttf";
import RobotoBlack from "./Roboto-Black.ttf";

const fonts = [
  { family: "Roboto-Regular", src: RobotoRegular },
  { family: "Roboto-Bold", src: RobotoBold },
  { family: "Roboto-Black", src: RobotoBlack },
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

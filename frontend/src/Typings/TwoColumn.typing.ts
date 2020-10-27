import ThemeShape from "./Theme.typing";
import { ReactElement } from "react";

type TwoColumnShape = {
  leftChildren: (ReactElement | undefined)[];
  rightChildren: (ReactElement | undefined)[];
};

export interface TwoColumnViewer extends TwoColumnShape {
  theme: ThemeShape;
}

export default TwoColumnShape;

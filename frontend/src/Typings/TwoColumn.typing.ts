import ResumeThemeShape from "./ResumeTheme.typing";
import { ReactElement } from "react";

type TwoColumnShape = {
  leftChildren: (ReactElement | undefined)[];
  rightChildren: (ReactElement | undefined)[];
};

export interface TwoColumnViewer extends TwoColumnShape {
  theme: ResumeThemeShape;
}

export default TwoColumnShape;

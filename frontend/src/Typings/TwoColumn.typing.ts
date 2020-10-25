import ThemeShape from "./Theme.typing";

type TwoColumnShape = {
  leftChildren: any[];
  rightChildren: any[];
};

export interface TwoColumnViewer extends TwoColumnShape {
  theme: ThemeShape;
}

export default TwoColumnShape;

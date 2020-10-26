import ThemeShape from "./Theme.typing";

type SectionHeaderShape = {
  text: string;
};

export interface SectionHeaderViewer extends SectionHeaderShape {
  theme: ThemeShape;
}

export default SectionHeaderShape;

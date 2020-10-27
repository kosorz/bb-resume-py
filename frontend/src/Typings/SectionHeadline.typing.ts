import ThemeShape from "./Theme.typing";

type SectionHeadlineShape = {
  text: string;
  fallback: string;
};

export interface SectionHeadlineViewer extends SectionHeadlineShape {
  theme: ThemeShape;
}

export default SectionHeadlineShape;

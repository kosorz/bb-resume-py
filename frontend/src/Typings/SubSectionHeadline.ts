import ThemeShape from "./Theme.typing";

type SubSectionHeadlineShape = {
  text: string;
  fallback: string;
};

export interface SubSectionHeadlineViewer extends SubSectionHeadlineShape {
  theme: ThemeShape;
}

export default SubSectionHeadlineShape;

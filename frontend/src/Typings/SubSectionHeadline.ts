import ResumeThemeShape from "./ResumeTheme.typing";

type SubSectionHeadlineShape = {
  text: string;
  fallback: string;
};

export interface SubSectionHeadlineViewer extends SubSectionHeadlineShape {
  theme: ResumeThemeShape;
}

export default SubSectionHeadlineShape;

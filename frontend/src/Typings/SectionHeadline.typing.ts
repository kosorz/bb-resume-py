import ResumeThemeShape from "./ResumeTheme.typing";

type SectionHeadlineShape = {
  text: string;
  fallback: string;
};

export interface SectionHeadlineViewer extends SectionHeadlineShape {
  theme: ResumeThemeShape;
}

export default SectionHeadlineShape;

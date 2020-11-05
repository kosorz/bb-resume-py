import ExperienceUnitShape from "./ExperienceUnit.typing";
import ResumeThemeShape from "./ResumeTheme.typing";

type ExperienceShape = {
  id: number;
  title: string;
  unlisted: true;
  units: ExperienceUnitShape[];
  order: number[];
};

export interface ExperienceViewer
  extends Omit<ExperienceShape, "unlisted" | "id"> {
  theme: ResumeThemeShape;
}

export default ExperienceShape;

import ExperienceUnitShape from "./ExperienceUnit.typing";
import ResumeThemeShape from "./ResumeTheme.typing";

type ExperienceShape = {
  id: number;
  title: string;
  deleted: true;
  units: ExperienceUnitShape[];
};

export interface ExperienceViewer
  extends Omit<ExperienceShape, "deleted" | "id"> {
  theme: ResumeThemeShape;
}

export default ExperienceShape;

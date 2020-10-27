import ExperienceUnitShape from "./ExperienceUnit.typing";
import ThemeShape from "./Theme.typing";

type ExperienceShape = {
  id: number;
  title: string;
  deleted: true;
  units: ExperienceUnitShape[];
};

export interface ExperienceViewer
  extends Omit<ExperienceShape, "deleted" | "id"> {
  theme: ThemeShape;
}

export default ExperienceShape;

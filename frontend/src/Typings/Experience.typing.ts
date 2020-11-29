import ExperienceUnitShape from "./ExperienceUnit.typing";
import MetaShape from "./Meta.typing";

type ExperienceShape = {
  id: number;
  title: string;
  unlisted: true;
  units: ExperienceUnitShape[];
  order: number[];
};

export interface ExperienceViewer
  extends Omit<ExperienceShape, "unlisted" | "id"> {
  meta: MetaShape;
}

export default ExperienceShape;

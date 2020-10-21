import ExperienceUnitShape from "../ExperienceUnit/ExperienceUnit.typing";

type ExperienceShape = {
  id: number;
  title: string;
  deleted: true;
  units: ExperienceUnitShape[];
};

export interface ExperienceEditor {
  className?: string;
}

export default ExperienceShape;

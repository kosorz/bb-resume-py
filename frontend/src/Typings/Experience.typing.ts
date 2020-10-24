import ExperienceUnitShape from "./ExperienceUnit.typing";

type ExperienceShape = {
  id: number;
  title: string;
  deleted: true;
  units: ExperienceUnitShape[];
};

export default ExperienceShape;

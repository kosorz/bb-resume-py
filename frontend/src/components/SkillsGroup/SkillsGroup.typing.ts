type SkillsGroupShape = {
  title: string;
  id: number;
  values: string[];
  deleted: true;
};

export interface SkillsGroupEditor extends SkillsGroupShape {
  className?: string;
}

export default SkillsGroupShape;

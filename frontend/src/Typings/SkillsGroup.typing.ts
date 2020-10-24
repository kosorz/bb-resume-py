type SkillsGroupShape = {
  title: string;
  id: number;
  values: string[];
  deleted: true;
};

export interface SkillsGroupEditor extends SkillsGroupShape {}

export default SkillsGroupShape;

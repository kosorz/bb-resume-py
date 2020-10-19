type SkillsGroupShape = {
  title: string;
  id: number;
  values: string[];
  deleted: true;
};

export interface SkillsGroupEditor extends Omit<SkillsGroupShape, "deleted"> {
  className?: string;
}

export default SkillsGroupShape;

import SkillsGroupShape from "../SkillsGroup/SkillsGroup.typing";

type SkillsShape = {
  title: string;
  id: number;
  deleted: true;
  groups: SkillsGroupShape[];
};

export interface SkillsEditor extends Omit<SkillsShape, "deleted"> {
  className?: string;
}

export default SkillsShape;

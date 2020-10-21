import SkillsGroupShape from "../SkillsGroup/SkillsGroup.typing";

type SkillsShape = {
  title: string;
  id: number;
  deleted: boolean;
  groups: SkillsGroupShape[];
};

export interface SkillsEditor {
  className?: string;
}

export default SkillsShape;

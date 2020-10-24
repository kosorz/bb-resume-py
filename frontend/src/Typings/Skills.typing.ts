import SkillsGroupShape from "./SkillsGroup.typing";

type SkillsShape = {
  title: string;
  id: number;
  deleted: boolean;
  groups: SkillsGroupShape[];
};

export default SkillsShape;

import SkillsGroupShape from "./SkillsGroup.typing";
import MetaShape from "./Meta.typing";

type SkillsShape = {
  title: string;
  id: number;
  unlisted: boolean;
  groups: SkillsGroupShape[];
  order: number[];
};

export interface SkillsViewer extends Omit<SkillsShape, "unlisted" | "id"> {
  meta: MetaShape;
  isActive: boolean;
}

export default SkillsShape;

import SkillsGroupShape from "./SkillsGroup.typing";
import MetaShape from "../Meta/Meta.typing";

type SkillsShape = {
  title: string;
  id: number;
  unlisted: boolean;
  groups: SkillsGroupShape[];
  order: number[];
};

export interface SkillsViewer extends Omit<SkillsShape, "unlisted" | "id"> {
  meta: MetaShape;
}

export default SkillsShape;

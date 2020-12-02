import MetaShape from "./Meta.typing";

export type SkillsGroupShape = {
  title: string;
  id: number;
  values: string[];
};

export interface SkillsGroupEditor extends SkillsGroupShape {
  isLast: boolean;
  isFirst: boolean;
  hasSiblings: boolean;
  wobble: boolean;
  i: number;
}

export interface SkillsGroupViewer extends Omit<SkillsGroupShape, "id"> {
  meta: MetaShape;
}

export default SkillsGroupShape;

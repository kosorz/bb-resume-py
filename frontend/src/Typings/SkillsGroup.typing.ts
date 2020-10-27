import ThemeShape from "./Theme.typing";

type SkillsGroupShape = {
  title: string;
  id: number;
  values: string[];
  deleted: true;
};

export interface SkillsGroupEditor extends SkillsGroupShape {}

export interface SkillsGroupViewer
  extends Omit<SkillsGroupShape, "deleted" | "id"> {
  theme: ThemeShape;
}

export default SkillsGroupShape;

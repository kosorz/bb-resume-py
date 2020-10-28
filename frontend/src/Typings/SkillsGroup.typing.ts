import ResumeThemeShape from "./ResumeTheme.typing";

type SkillsGroupShape = {
  title: string;
  id: number;
  values: string[];
  deleted: true;
};

export interface SkillsGroupEditor extends SkillsGroupShape {}

export interface SkillsGroupViewer
  extends Omit<SkillsGroupShape, "deleted" | "id"> {
  theme: ResumeThemeShape;
}

export default SkillsGroupShape;

import ResumeThemeShape from "./ResumeTheme.typing";

type SkillsGroupShape = {
  title: string;
  id: number;
  values: string[];
};

export interface SkillsGroupEditor extends SkillsGroupShape {
  isLast: boolean;
  isFirst: boolean;
  hasSiblings: boolean;
}

export interface SkillsGroupViewer extends Omit<SkillsGroupShape, "id"> {
  theme: ResumeThemeShape;
}

export default SkillsGroupShape;

import SkillsGroupShape from "./SkillsGroup.typing";
import ResumeThemeShape from "./ResumeTheme.typing";

type SkillsShape = {
  title: string;
  id: number;
  unlisted: boolean;
  groups: SkillsGroupShape[];
  order: number[];
};

export interface SkillsViewer extends Omit<SkillsShape, "unlisted" | "id"> {
  theme: ResumeThemeShape;
}

export default SkillsShape;

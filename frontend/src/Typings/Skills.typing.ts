import SkillsGroupShape from "./SkillsGroup.typing";
import ResumeThemeShape from "./ResumeTheme.typing";

type SkillsShape = {
  title: string;
  id: number;
  deleted: boolean;
  groups: SkillsGroupShape[];
};

export interface SkillsViewer extends Omit<SkillsShape, "deleted" | "id"> {
  theme: ResumeThemeShape;
}

export default SkillsShape;

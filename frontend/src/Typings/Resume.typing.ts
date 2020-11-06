import ExperienceShape from "./Experience.typing";
import InfoShape from "./Info.typing";
import SkillsShape from "./Skills.typing";
import ResumeThemeShape from "./ResumeTheme.typing";

type ResumeShape = {
  title: string;
  id: number;
  owner_id: number;
  deleted: boolean;
  leftColumn: string[];
  rightColumn: string[];
  skills?: SkillsShape;
  experience?: ExperienceShape;
  info?: InfoShape;
};

export interface ResumeViewer {
  data: ResumeShape;
  theme: ResumeThemeShape;
  lastEdit: number;
}

export default ResumeShape;

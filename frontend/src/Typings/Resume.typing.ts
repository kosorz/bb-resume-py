import ExperienceShape from "./Experience.typing";
import InfoShape from "./Info.typing";
import SkillsShape from "./Skills.typing";
import ThemeShape from "./Theme.typing";

type ResumeShape = {
  title: string;
  id: number;
  owner_id: number;
  deleted: boolean;
  skills?: SkillsShape;
  experience?: ExperienceShape;
  info?: InfoShape;
};

export interface ResumeViewer {
  data: ResumeShape;
  theme: ThemeShape;
  lastEdit: number;
}

export default ResumeShape;

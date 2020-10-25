import ExperienceShape from "./Experience.typing";
import InfoShape from "./Info.typing";
import SkillsShape from "./Skills.typing";

type ResumeShape = {
  title: string;
  id: number;
  owner_id: number;
  deleted: boolean;
  skills?: SkillsShape;
  experience?: ExperienceShape;
  info: InfoShape;
};

export interface ResumeViewer {
  data: ResumeShape;
  lastEdit: number;
}

export default ResumeShape;

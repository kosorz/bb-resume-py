import ExperienceShape from "../Experience/Experience.typing";
import InfoShape from "../Info/Info.typing";
import SkillsShape from "../Skills/Skills.typing";

type ResumeShape = {
  title: string;
  id: number;
  owner_id: number;
  deleted: boolean;
  skills?: SkillsShape;
  experience?: ExperienceShape;
  info: InfoShape;
};

export interface ResumeEditor {
  className?: string;
}

export default ResumeShape;

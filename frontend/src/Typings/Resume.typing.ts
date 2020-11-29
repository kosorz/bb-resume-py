import ExperienceShape from "./Experience.typing";
import InfoShape from "./Info.typing";
import SkillsShape from "./Skills.typing";
import MetaShape from "./Meta.typing";

type ResumeShape = {
  title: string;
  id: number;
  owner_id: number;
  deleted: boolean;
  meta?: MetaShape;
  skills?: SkillsShape;
  experience?: ExperienceShape;
  info?: InfoShape;
};

export interface ResumeViewer {
  data: ResumeShape;
  meta: MetaShape;
}

export interface ResumeEditor {
  meta: MetaShape;
}

export default ResumeShape;

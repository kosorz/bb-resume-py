import ExperienceShape from "./editor/sections/Experience/Experience.typing";
import InfoShape from "./editor/sections/Info/Info.typing";
import SkillsShape from "./editor/sections/Skills/Skills.typing";
import MetaShape from "./editor/sections/Meta/Meta.typing";

type ResumeShape = {
  title: string;
  id: number;
  owner_id: number;
  deleted: boolean;
  info: InfoShape;
  meta: MetaShape;
  skills?: SkillsShape;
  experience?: ExperienceShape;
};

export interface ResumeViewer {
  data: ResumeShape;
}

export default ResumeShape;

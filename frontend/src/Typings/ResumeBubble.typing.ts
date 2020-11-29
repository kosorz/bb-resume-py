import ResumeShape from "./Resume.typing";
import InfoShape from "./Info.typing";
import SkillsShape from "./Skills.typing";
import SkillsGroupShape from "./SkillsGroup.typing";
import ExperienceShape from "./Experience.typing";
import ExperienceUnitShape from "./ExperienceUnit.typing";
import { ContentShape } from "./Meta.typing";

type ResumeBubbleShape = {
  updatedAt?: number;
  resume: ResumeShape;
  getResume: () => void;
  setResume: (data: Partial<ResumeShape>) => void;
  setUpdateTime: () => void;
  deleteSectionUpdate: (
    content: ContentShape,
    identifier: "skills" | "experience" | "info" | "meta" | "gallery" | ""
  ) => void;
  addSectionUpdate: (
    data: SkillsShape | ExperienceShape,
    identifier: "skills" | "experience" | "info" | "meta" | "gallery" | "",
    order: "leftOrder" | "rightOrder" | "order"
  ) => void;
  updateInfo: (data: InfoShape) => void;
  updateInfoPhoto: (photoId: string) => void;
  updateSkills: (data: SkillsShape) => void;
  updateSkillsGroup: (data: SkillsGroupShape) => void;
  updateSkillsOrder: (order: number[]) => void;
  addSkillsGroup: (data: SkillsGroupShape) => void;
  removeSkillsGroup: (id: number) => void;
  updateExperience: (data: ExperienceShape) => void;
  updateExperienceUnit: (data: ExperienceUnitShape) => void;
  updateExperienceOrder: (order: number[]) => void;
  addExperienceUnit: (data: ExperienceUnitShape) => void;
  removeExperienceUnit: (id: number) => void;
  updateContent: (data: ContentShape) => void;
};

export default ResumeBubbleShape;

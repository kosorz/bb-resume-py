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
  activeSection: "skills" | "experience" | "info" | "meta" | "";
  getResume: () => void;
  setResume: (data: ResumeShape) => void;
  setUpdateTime: () => void;
  setActiveSection: (
    section: "skills" | "experience" | "info" | "meta" | ""
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

import ResumeShape from "./Resume.typing";
import InfoShape from "./Info.typing";
import SkillsShape from "./Skills.typing";
import SkillsGroupShape from "./SkillsGroup.typing";
import ExperienceShape from "./Experience.typing";
import ExperienceUnitShape from "./ExperienceUnit.typing";
import { ContentShape } from "./Meta.typing";

type ResumeBubbleShape = {
  updatedAt?: number;
  openSubSections: {
    skills?: number;
    experience?: number;
  };
  resume: ResumeShape;
  getResume: () => void;
  resetPhotoSettings: () => void;
  setResume: (data: Partial<ResumeShape>) => void;
  setUpdateTime: () => void;
  deleteSectionUpdate: (
    content: ContentShape,
    identifier: "skills" | "experience" | "info" | "meta" | ""
  ) => void;
  addSectionUpdate: (
    data: SkillsShape | ExperienceShape,
    identifier: "skills" | "experience" | "info" | "meta" | "",
    order: "leftOrder" | "rightOrder" | "order"
  ) => void;
  updateInfo: (data: InfoShape) => void;
  updateInfoCroppedPhoto: (croppedPhotoId: string) => void;
  updateSkills: (data: SkillsShape) => void;
  updateSkillsGroup: (data: SkillsGroupShape) => void;
  setOpenSubSection: (identifier: "skills" | "experience", id?: number) => void;
  addSkillsGroup: (data: SkillsGroupShape) => void;
  removeSkillsGroup: (id: number) => void;
  updateExperience: (data: ExperienceShape) => void;
  updateExperienceUnit: (data: ExperienceUnitShape) => void;
  updateContentOrder: (
    layout: "full" | "split",
    order: "unlisted" | "order" | "leftOrder" | "rightOrder",
    data: string[]
  ) => void;
  addExperienceUnit: (data: ExperienceUnitShape) => void;
  removeExperienceUnit: (id: number) => void;
  updateSubSectionsOrder: (
    identifier: "skills" | "experience",
    data: number[]
  ) => void;
  updateContent: (data: ContentShape) => void;
};

export default ResumeBubbleShape;

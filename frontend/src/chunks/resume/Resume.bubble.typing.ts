import ResumeShape from "./Resume.typing";
import InfoShape from "./editor/sections/Info/Info.typing";
import SkillsShape from "./editor/sections/Skills/Skills.typing";
import SkillsGroupShape from "./editor/sections/Skills/SkillsGroup.typing";
import ExperienceShape from "./editor/sections/Experience/Experience.typing";
import ExperienceUnitShape from "./editor/sections/Experience/ExperienceUnit.typing";
import { ContentShape } from "./editor/sections/Meta/Meta.typing";

type ResumeBubbleShape = {
  openSubSections: {
    skills?: number;
    experience?: number;
  };
  resume: ResumeShape;
  resetPhotoSettings: () => void;
  setResume: (data: Partial<ResumeShape>) => void;
  deleteSectionUpdate: (
    content: ContentShape,
    identifier: "skills" | "experience" | "info" | "meta" | "gallery" | ""
  ) => void;
  addSectionUpdate: (
    data: SkillsShape | ExperienceShape,
    identifier: "skills" | "experience" | "info" | "meta" | "gallery" | "",
    order: "mainOrder" | "secondaryOrder" | "order"
  ) => void;
  updateInfo: (data: InfoShape) => void;
  updateInfoCroppedPhoto: (croppedPhotoId: string) => void;
  updateSkills: (data: SkillsShape) => void;
  updateSkillsGroup: (id: number) => (data: SkillsGroupShape) => void;
  setOpenSubSection: (identifier: "skills" | "experience", id?: number) => void;
  addSkillsGroup: (data: SkillsGroupShape) => void;
  removeSkillsGroup: (id: number) => void;
  updateExperience: (data: ExperienceShape) => void;
  updateExperienceUnit: (id: number) => (data: ExperienceUnitShape) => void;
  updateContentOrder: (
    layout: "full" | "split",
    order: "unlisted" | "order" | "mainOrder" | "secondaryOrder",
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

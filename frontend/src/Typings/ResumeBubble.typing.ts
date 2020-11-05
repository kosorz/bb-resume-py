import ResumeShape from "./Resume.typing";
import InfoShape from "./Info.typing";
import SkillsShape from "./Skills.typing";
import SkillsGroupShape from "./SkillsGroup.typing";
import ExperienceShape from "./Experience.typing";
import ExperienceUnitShape from "./ExperienceUnit.typing";
import ResumeThemeShape from "./ResumeTheme.typing";

type ResumeBubbleShape = {
  updatedAt: number;
  resume: ResumeShape;
  theme: ResumeThemeShape;
  setUpdateTime: () => void;
  setResume: () => void;
  updateInfo: (data: InfoShape) => void;
  updateSkills: (data: SkillsShape) => void;
  updateSkillsGroup: (data: SkillsGroupShape) => void;
  addSkillsGroup: (data: SkillsGroupShape) => void;
  removeSkillsGroup: (id: number) => void;
  updateExperience: (data: ExperienceShape) => void;
  updateExperienceUnit: (data: ExperienceUnitShape) => void;
  addExperienceUnit: (data: ExperienceUnitShape) => void;
  removeExperienceUnit: (id: number) => void;
  updateSkillsOrder: (order: number[]) => void;
};

export default ResumeBubbleShape;

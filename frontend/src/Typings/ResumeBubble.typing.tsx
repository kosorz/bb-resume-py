import ResumeShape from "./Resume.typing";
import InfoShape from "./Info.typing";
import SkillsShape from "./Skills.typing";
import SkillsGroupShape from "./SkillsGroup.typing";
import ExperienceShape from "./Experience.typing";
import ExperienceUnitShape from "./ExperienceUnit.typing";
import ThemeShape from "./Theme.typing";

type ResumeBubbleShape = {
  updatedAt: number;
  resume: ResumeShape;
  theme: ThemeShape;
  setUpdateTime: () => void;
  setResume: () => void;
  updateInfo: (data: InfoShape) => void;
  updateSkills: (data: SkillsShape) => void;
  updateSkillsGroup: (data: SkillsGroupShape) => void;
  updateExperience: (data: ExperienceShape) => void;
  updateExperienceUnit: (data: ExperienceUnitShape) => void;
};

export default ResumeBubbleShape;

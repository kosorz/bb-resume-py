import ResumeShape from "../components/Resume/Resume.typing";
import InfoShape from "../components/Info/Info.typing";
import SkillsShape from "../components/Skills/Skills.typing";
import SkillsGroupShape from "../components/SkillsGroup/SkillsGroup.typing";
import ExperienceShape from "../components/Experience/Experience.typing";
import ExperienceUnitShape from "../components/ExperienceUnit/ExperienceUnit.typing";

type ResumeBubbleShape = {
  resume: ResumeShape;
  setResume: () => void;
  updateInfo: (data: InfoShape) => void;
  updateSkills: (data: SkillsShape) => void;
  updateSkillsGroup: (data: SkillsGroupShape) => void;
  updateExperience: (data: ExperienceShape) => void;
  updateExperienceUnit: (data: ExperienceUnitShape) => void;
};

export default ResumeBubbleShape;

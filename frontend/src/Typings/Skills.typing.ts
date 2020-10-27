import SkillsGroupShape from "./SkillsGroup.typing";
import ThemeShape from "./Theme.typing";

type SkillsShape = {
  title: string;
  id: number;
  deleted: boolean;
  groups: SkillsGroupShape[];
};

export interface SkillsViewer extends Omit<SkillsShape, "deleted" | "id"> {
  theme: ThemeShape;
}

export default SkillsShape;

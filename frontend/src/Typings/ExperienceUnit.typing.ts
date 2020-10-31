import ResumeThemeShape from "./ResumeTheme.typing";

type ExperienceUnitShape = {
  id: number;
  deleted: true;
  title: string;
  company_name: string;
  description: string;
  location: string;
  date_start: string;
  date_end: string;
  link: string;
  company_name_enabled: boolean;
  description_enabled: boolean;
  location_enabled: boolean;
  period_enabled: boolean;
  link_enabled: boolean;
};

export interface ExperienceUnitEditor extends ExperienceUnitShape {
  isLast: boolean;
}

export interface ExperienceUnitViewer
  extends Omit<ExperienceUnitShape, "deleted" | "id"> {
  theme: ResumeThemeShape;
}

export default ExperienceUnitShape;

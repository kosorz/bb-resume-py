type ExperienceUnitShape = {
  id: number;
  title: string;
  deleted: true;
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

export interface ExperienceUnitEditor
  extends Omit<ExperienceUnitShape, "deleted"> {
  className?: string;
}

export default ExperienceUnitShape;

import MetaShape from "./Meta.typing";

type InfoShape = {
  name: string;
  resume_id: number;
  phone: string;
  link: string;
  email: string;
  location: string;
  role: string;
  phone_enabled: boolean;
  link_enabled: boolean;
  email_enabled: boolean;
  location_enabled: boolean;
  role_enabled: boolean;
};

export interface InfoViewer extends InfoShape {
  meta: MetaShape;
  isActive: boolean;
}

export default InfoShape;

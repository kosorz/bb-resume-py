import ThemeShape from "./Theme.typing";

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
  theme: ThemeShape;
}

export default InfoShape;
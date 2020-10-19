type InfoShape = {
  name: string;
  resume_id: number;
  phone: string;
  link: string;
  email: string;
  location: string;
  role: string;
  phone_enabled: true;
  link_enabled: true;
  email_enabled: true;
  location_enabled: true;
  role_enabled: true;
};

export interface InfoEditor extends InfoShape {
  className?: string;
}

export default InfoShape;

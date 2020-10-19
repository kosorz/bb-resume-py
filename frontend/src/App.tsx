import React, { useEffect, useState } from "react";
import style from "./App.module.scss";
import axios from "./util/axios";

import Info from "./components/Info/Info";
import InfoShape from "./components/Info/Info.typing";

import SkillsShape from "./components/Skills/Skills.typing";
import Skills from "./components/Skills/Skills";

interface ExperienceUnitShape {
  title: string;
  id: number;
  deleted: true;
  company_name: string;
  description: string;
  location: string;
  date_start: string;
  date_end: string;
  link: string;
  company_name_enabled: true;
  description_enabled: true;
  location_enabled: true;
  period_enabled: true;
  link_enabled: true;
}

interface ExperienceShape {
  title: string;
  id: number;
  deleted: true;
  resume_id: number;
  units: ExperienceUnitShape[];
}

interface ResumeShape {
  title: string;
  id: number;
  owner_id: number;
  deleted: boolean;
  skills?: SkillsShape;
  experience?: ExperienceShape;
  info: InfoShape;
}

function App() {
  const [resume, setResume] = useState<ResumeShape>({
    title: "",
    id: 0,
    owner_id: 0,
    deleted: true,
    skills: undefined,
    experience: undefined,
    info: {
      resume_id: 0,
      name: "",
      phone: "",
      link: "",
      email: "",
      location: "",
      role: "",
      phone_enabled: true,
      link_enabled: true,
      email_enabled: true,
      location_enabled: true,
      role_enabled: true,
    },
  });

  useEffect(() => {
    async function getResume() {
      const resume = await axios.get("/resumes/1");
      setResume(resume.data);
    }

    getResume();
  }, []);

  return (
    <div className={style["App"]}>
      <Info {...resume.info} />
      {resume.skills && !resume.skills.deleted && <Skills {...resume.skills} />}
    </div>
  );
}

export default App;

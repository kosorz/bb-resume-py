import React, { useEffect, useState } from "react";
import style from "./App.module.scss";
import axios from "./util/axios";

import Info from "./components/Info/Info";
import Experience from "./components/Experience/Experience";
import Skills from "./components/Skills/Skills";

import InfoShape from "./components/Info/Info.typing";
import ExperienceShape from "./components/Experience/Experience.typing";
import SkillsShape from "./components/Skills/Skills.typing";

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
      phone_enabled: false,
      link_enabled: false,
      email_enabled: false,
      location_enabled: false,
      role_enabled: false,
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
      {resume.experience && !resume.experience.deleted && (
        <Experience {...resume.experience} />
      )}
    </div>
  );
}

export default App;

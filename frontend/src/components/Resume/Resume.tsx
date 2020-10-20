import React, { useEffect, useState } from "react";

import Experience from "../Experience/Experience";
import Info from "../Info/Info";
import Skills from "../Skills/Skills";

import ResumeShape from "./Resume.typing";
import axios from "../../util/axios";

import style from "./Resume.module.scss";

function ResumeFunctional() {
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
    <div className={style["Resume"]}>
      <Info {...resume.info} />
      {resume.skills && !resume.skills.deleted && <Skills {...resume.skills} />}
      {resume.experience && !resume.experience.deleted && (
        <Experience {...resume.experience} />
      )}
    </div>
  );
}

class Resume extends React.Component {
  render() {
    return <ResumeFunctional />;
  }
}

export default Resume;

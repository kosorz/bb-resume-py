import React, { createContext, ReactNode } from "react";
import { useLocalObservable } from "mobx-react-lite";
import axios from "../util/axios";
import ResumeBubbleShape from "./ResumeBubble.typing";

let initialState: ResumeBubbleShape = {
  resume: {
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
  },
  setResume: () => {},
  updateInfo: () => {},
  updateSkills: () => {},
  updateSkillsGroup: () => {},
  updateExperience: () => {},
  updateExperienceUnit: () => {},
};

export const ResumeBubble = createContext(initialState);

const BubbleProvider = ({ children }: { children: ReactNode }) => {
  initialState = {
    ...initialState,
    setResume: async () => {
      const res = await axios.get("/resumes/1");
      store.resume = res.data;
    },
    updateInfo: (data) => {
      store.resume.info = data;
    },
    updateSkills: (data) => {
      store.resume.skills = { ...store.resume.skills, ...data };
    },
    updateSkillsGroup: (data) => {
      if (store.resume.skills) {
        store.resume.skills.groups = store.resume.skills.groups.map((gr) =>
          gr.id === data.id ? data : gr
        );
      }
    },
    updateExperience: (data) => {
      store.resume.experience = { ...store.resume.experience, ...data };
    },
    updateExperienceUnit: (data) => {
      if (store.resume.experience) {
        store.resume.experience.units = store.resume.experience.units.map((u) =>
          u.id === data.id ? data : u
        );
      }
    },
  };
  const store = useLocalObservable(() => initialState);

  return (
    <ResumeBubble.Provider value={store}>{children}</ResumeBubble.Provider>
  );
};

export default BubbleProvider;

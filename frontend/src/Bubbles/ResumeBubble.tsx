import React, { createContext, ReactNode } from "react";
import { useLocalObservable } from "mobx-react-lite";
import axios from "../util/axios";
import ResumeBubbleShape from "../typings/ResumeBubble.typing";

let initialState: ResumeBubbleShape = {
  updatedAt: new Date().getTime(),
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
  setUpdateTime: () => {},
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
    setUpdateTime: () => {
      store.updatedAt = new Date().getTime();
    },
    setResume: async () => {
      const res = await axios.get("/resumes/1");
      store.resume = res.data;
      store.setUpdateTime();
    },
    updateInfo: (data) => {
      store.resume.info = data;
      store.setUpdateTime();
    },
    updateSkills: (data) => {
      store.resume.skills = { ...store.resume.skills, ...data };
      store.setUpdateTime();
    },
    updateSkillsGroup: (data) => {
      if (store.resume.skills) {
        store.resume.skills.groups = store.resume.skills.groups.map((gr) =>
          gr.id === data.id ? data : gr
        );
      }
      store.setUpdateTime();
    },
    updateExperience: (data) => {
      store.resume.experience = { ...store.resume.experience, ...data };
      store.setUpdateTime();
    },
    updateExperienceUnit: (data) => {
      if (store.resume.experience) {
        store.resume.experience.units = store.resume.experience.units.map((u) =>
          u.id === data.id ? data : u
        );
      }
      store.setUpdateTime();
    },
  };
  const store = useLocalObservable(() => initialState);

  return (
    <ResumeBubble.Provider value={store}>{children}</ResumeBubble.Provider>
  );
};

export default BubbleProvider;

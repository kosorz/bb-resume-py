import React, { createContext, ReactNode } from "react";
import { useLocalObservable } from "mobx-react-lite";
import axios from "../util/axios";
import ResumeBubbleShape from "../typings/ResumeBubble.typing";

let initialState: ResumeBubbleShape = {
  updatedAt: new Date().getTime(),
  theme: {
    colors: {
      main: "red",
      secondary: "lightpink",
    },
    fontSize: {
      big: 32,
      main: 15,
      small: 12,
    },
    fontWeight: {
      light: "light",
      normal: "normal",
      bold: "bold",
    },
    paper: {
      size: "A4",
      margin: 20,
    },
  },
  resume: {
    title: "",
    id: 0,
    owner_id: 0,
    deleted: true,
    skills: undefined,
    experience: undefined,
    info: undefined,
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

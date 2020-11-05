import React, { createContext, ReactNode } from "react";
import { useLocalObservable } from "mobx-react-lite";
import axios from "../util/axios";
import ResumeBubbleShape from "../typings/ResumeBubble.typing";

let initialState: ResumeBubbleShape = {
  updatedAt: new Date().getTime(),
  theme: {
    colors: {
      main: "#000",
      secondary: "#686868",
    },
    fontSize: {
      big: 42,
      large: 22,
      medium: 17,
      main: 13,
      small: 11,
    },
    fontFamily: {
      light: "Roboto-Light",
      normal: "Roboto-Regular",
      medium: "Roboto-Medium",
      bold: "Roboto-Bold",
      black: "Roboto-Black",
    },
    paper: {
      size: "A4",
      space: 40,
    },
  },
  resume: {
    title: "",
    id: 0,
    owner_id: 0,
    deleted: false,
    skills: undefined,
    experience: undefined,
    info: undefined,
  },
  setUpdateTime: () => {},
  setResume: () => {},
  updateInfo: () => {},
  updateSkills: () => {},
  updateSkillsGroup: () => {},
  updateSkillsOrder: () => {},
  addSkillsGroup: () => {},
  removeSkillsGroup: () => {},
  updateExperience: () => {},
  updateExperienceUnit: () => {},
  updateExperienceOrder: () => {},
  addExperienceUnit: () => {},
  removeExperienceUnit: () => {},
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
        store.setUpdateTime();
      }
    },
    updateSkillsOrder: (order) => {
      if (store.resume.skills) {
        store.resume.skills.order = order;
        store.setUpdateTime();
      }
    },
    addSkillsGroup: (data) => {
      if (store.resume.skills) {
        store.resume.skills.groups = store.resume.skills.groups.concat(data);
        store.resume.skills.order = store.resume.skills.order.concat(data.id);
        store.setUpdateTime();
      }
    },
    removeSkillsGroup: (id) => {
      if (store.resume.skills) {
        store.resume.skills.groups = store.resume.skills.groups.filter(
          (gr) => gr.id !== id
        );
        store.resume.skills.order = store.resume.skills.order.filter(
          (g_id) => g_id !== id
        );
        store.setUpdateTime();
      }
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
        store.setUpdateTime();
      }
    },
    updateExperienceOrder: (order) => {
      if (store.resume.experience) {
        store.resume.experience.order = order;
        store.setUpdateTime();
      }
    },
    addExperienceUnit: (data) => {
      if (store.resume.experience) {
        store.resume.experience.units = store.resume.experience.units.concat(
          data
        );
        store.resume.experience.order = store.resume.experience.order.concat(
          data.id
        );
        store.setUpdateTime();
      }
    },
    removeExperienceUnit: (id) => {
      if (store.resume.experience) {
        store.resume.experience.units = store.resume.experience.units.filter(
          (u) => u.id !== id
        );
        store.resume.experience.order = store.resume.experience.order.filter(
          (u_id) => u_id !== id
        );
        store.setUpdateTime();
      }
    },
  };
  const store = useLocalObservable(() => initialState);

  return (
    <ResumeBubble.Provider value={store}>{children}</ResumeBubble.Provider>
  );
};

export default BubbleProvider;

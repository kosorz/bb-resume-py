import React, { createContext, ReactNode } from "react";
import { useLocalObservable } from "mobx-react-lite";

import axios from "../util/axios";
import ResumeBubbleShape from "../typings/ResumeBubble.typing";

let initialState: ResumeBubbleShape = {
  updatedAt: undefined,
  resume: {
    title: "",
    id: 0,
    owner_id: 0,
    deleted: false,
    meta: undefined,
    skills: undefined,
    experience: undefined,
    info: undefined,
  },
  setUpdateTime: () => {},
  getResume: () => {},
  setResume: () => {},
  updateInfo: () => {},
  updateInfoPhoto: () => {},
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
  deleteSectionUpdate: () => {},
  addSectionUpdate: () => {},
  updateContent: () => {},
};

export const ResumeBubble = createContext(initialState);

const BubbleProvider = ({ children }: { children: ReactNode }) => {
  initialState = {
    ...initialState,
    setUpdateTime: () => {
      store.updatedAt = new Date().getTime();
    },
    getResume: () => {
      axios.get("/resumes/1").then((res) => {
        store.resume = res.data;
      });
      store.setUpdateTime();
    },
    setResume: (data) => {
      store.resume = { ...store.resume, ...data };
    },
    deleteSectionUpdate: (content, identifier) => {
      store.setResume({ [identifier]: undefined });
      store.updateContent(content);
    },
    addSectionUpdate: (data, identifier, order) => {
      store.setResume({ [identifier]: data });
      if (store.resume.meta) {
        const { content } = store.resume.meta;
        store.resume.meta.content =
          order === "order"
            ? {
                ...content,
                full: {
                  ...content.full,
                  order: [...content.full.order, identifier],
                },
                split: {
                  ...content.split,
                  unlisted: [...content.split.unlisted, identifier],
                },
              }
            : {
                ...content,
                full: {
                  ...content.full,
                  unlisted: [...content.full.unlisted, identifier],
                },
                split: {
                  ...content.split,
                  [order]: [...content.split[order], identifier],
                },
              };
      }
      store.setUpdateTime();
    },
    updateInfo: (data) => {
      store.resume.info = data;
      store.setUpdateTime();
    },
    updateInfoPhoto: (photoId) => {
      if (store.resume.info) {
        store.resume.info.photo = photoId;
        store.setUpdateTime();
      }
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
    updateContent: (content) => {
      if (store.resume.meta) {
        store.resume.meta.content = content;
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

import React, { createContext, ReactNode } from "react";
import { useLocalObservable } from "mobx-react-lite";

import ResumeBubbleShape from "../typings/ResumeBubble.typing";

let initialState: ResumeBubbleShape = {
  updatedAt: undefined,
  openSubSections: {
    skills: undefined,
    experience: undefined,
  },
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
  setResume: () => {},
  updateInfo: () => {},
  updateInfoCroppedPhoto: () => {},
  setOpenSubSection: () => {},
  updateSkills: () => {},
  updateSkillsGroup: () => {},
  addSkillsGroup: () => {},
  removeSkillsGroup: () => {},
  updateExperience: () => {},
  updateExperienceUnit: () => {},
  addExperienceUnit: () => {},
  removeExperienceUnit: () => {},
  deleteSectionUpdate: () => {},
  updateContentOrder: () => {},
  addSectionUpdate: () => {},
  updateSubSectionsOrder: () => {},
  updateContent: () => {},
  resetPhotoSettings: () => {},
};

export const ResumeBubble = createContext(initialState);

const BubbleProvider = ({ children }: { children: ReactNode }) => {
  initialState = {
    ...initialState,
    setUpdateTime: () => {
      store.updatedAt = new Date().getTime();
    },
    setResume: (data) => {
      store.resume = { ...store.resume, ...data };
      store.setUpdateTime();
    },
    deleteSectionUpdate: (content, identifier) => {
      store.setResume({ [identifier]: undefined });
      store.updateContent(content);
      store.setUpdateTime();
    },
    setOpenSubSection: (identifier, id) => {
      store.openSubSections = {
        ...store.openSubSections,
        [identifier]: id,
      };
    },
    updateContentOrder: (layout, order, data) => {
      if (store.resume.meta) {
        const { content } = store.resume.meta;
        store.resume.meta.content = {
          ...content,
          [layout]: { ...content[layout], [order]: data },
        };
        store.setUpdateTime();
      }
    },
    resetPhotoSettings: () => {
      if (store.resume.meta) {
        store.resume.meta.photoSettings = {
          x: 0,
          y: 0,
          width: 0,
          height: 0,
          rotation: 0,
        };
      }
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
        store.setUpdateTime();
      }
    },
    updateInfo: (data) => {
      store.resume.info = data;
      store.setUpdateTime();
    },
    updateInfoCroppedPhoto: (croppedPhotoId) => {
      if (store.resume.info) {
        store.resume.info.cropped_photo = croppedPhotoId;
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
    updateSubSectionsOrder: (identifier, data) => {
      const section = store.resume[identifier];
      if (section) {
        section.order = data;
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

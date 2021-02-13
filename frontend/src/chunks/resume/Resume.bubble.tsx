import React, { createContext, ReactNode } from "react";
import { useLocalObservable } from "mobx-react-lite";

import ResumeBubbleShape from "./Resume.bubble.typing";
import { updateObject } from "../../util/fns";

let store: ResumeBubbleShape;
let initialState: ResumeBubbleShape = {
  openSubSections: {
    skills: undefined,
    experience: undefined,
  },
  resume: {
    title: "",
    id: 0,
    owner_id: 0,
    meta: {
      template: "classic",
      colors: { main: "", secondary: "" },
      fontSize: {
        small: 10,
        main: 13,
        medium: 15,
        large: 20,
        big: 34,
      },
      fontFamily: "Roboto",
      background: "X-parts",
      paper: {
        size: "A4",
        space: 60,
        layout: "split",
      },
      content: {
        split: {
          unlisted: [],
          mainOrder: [],
          secondaryOrder: [],
        },
        full: {
          unlisted: [],
          order: [],
        },
      },
      photoSettings: {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        rotation: 0,
      },
    },
    skills: undefined,
    experience: undefined,
    info: {
      name: "",
      resume_id: 0,
      phone: "",
      link: "",
      email: "",
      photo: "",
      cropped_photo: "",
      location: "",
      quote: "",
      role: "",
      photo_locked: false,
      phone_enabled: false,
      photo_enabled: false,
      link_enabled: false,
      email_enabled: false,
      location_enabled: false,
      role_enabled: false,
      quote_enabled: false,
    },
  },
  setResume: (data) => {
    store.resume = updateObject(store.resume, data);
  },
  deleteSectionUpdate: (content, identifier) => {
    store.setResume({ [identifier]: undefined });
    store.updateContent(content);
  },
  setOpenSubSection: (identifier, id) => {
    store.openSubSections = {
      ...store.openSubSections,
      [identifier]: id,
    };
  },
  updateContentOrder: (layout, order, data) => {
    const { content } = store.resume.meta;
    store.resume.meta.content = updateObject(store.resume.meta.content, {
      [layout]: { ...content[layout], [order]: data },
    });
  },
  resetPhotoSettings: () => {
    store.resume.meta.photoSettings = {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      rotation: 0,
    };
  },
  addSectionUpdate: (data, identifier, order) => {
    store.setResume({ [identifier]: data });
    const { content } = store.resume.meta;
    store.resume.meta.content = updateObject(
      store.resume.meta.content,
      order === "order"
        ? {
            full: {
              order: [...content.full.order, identifier],
            },
            split: {
              unlisted: [...content.split.unlisted, identifier],
            },
          }
        : {
            full: {
              unlisted: [...content.full.unlisted, identifier],
            },
            split: {
              [order]: [...content.split[order], identifier],
            },
          }
    );
  },
  updateInfo: (data) => {
    store.resume.info = updateObject(store.resume.info, data);
  },
  updateInfoCroppedPhoto: (croppedPhotoId) => {
    if (store.resume.info) {
      store.resume.info.cropped_photo = croppedPhotoId;
    }
  },
  updateSkills: (data) => {
    store.resume.skills = { ...store.resume.skills, ...data };
  },
  updateSkillsGroup: (id) => (data) => {
    if (store.resume.skills) {
      store.resume.skills.groups = store.resume.skills.groups.map((gr) =>
        gr.id === id ? updateObject(gr, data) : gr
      );
    }
  },
  addSkillsGroup: (data) => {
    if (store.resume.skills) {
      store.resume.skills.groups = store.resume.skills.groups.concat(data);
      store.resume.skills.order = store.resume.skills.order.concat(data.id);
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
    }
  },
  updateExperience: (data) => {
    store.resume.experience = { ...store.resume.experience, ...data };
  },
  updateExperienceUnit: (id) => (data) => {
    if (store.resume.experience) {
      store.resume.experience.units = store.resume.experience.units.map((u) =>
        u.id === id ? updateObject(u, data) : u
      );
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
    }
  },
  updateContent: (content) => {
    store.resume.meta.content = content;
  },
  updateSubSectionsOrder: (identifier, data) => {
    const section = store.resume[identifier];
    if (section) {
      section.order = data;
    }
  },
};
export const ResumeBubble = createContext(initialState);

const BubbleProvider = ({ children }: { children: ReactNode }) => {
  store = useLocalObservable(() => initialState);

  return (
    <ResumeBubble.Provider value={store}>{children}</ResumeBubble.Provider>
  );
};

export default BubbleProvider;

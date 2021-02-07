import {
  FieldInputProps,
  FieldMetaProps,
  FormikProps,
  FieldHelperProps,
} from "formik";
import { diff } from "deep-diff";
import { toJS } from "mobx";
import { isArray } from "util";

import axios from "./axios";
import InfoShape from "../chunks/resume/editor/sections/Info/Info.typing";
import ExperienceShape from "../chunks/resume/editor/sections/Experience/Experience.typing";
import SkillsShape from "../chunks/resume/editor/sections/Skills/Skills.typing";
import SkillsGroupShape from "../chunks/resume/editor/sections/Skills/SkillsGroup.typing";
import ExperienceUnitShape from "../chunks/resume/editor/sections/Experience/ExperienceUnit.typing";
import MetaShape from "../chunks/resume/editor/sections/Meta/Meta.typing";

export function getFieldPropsMeta(
  formik: FormikProps<any>,
  name: string
): FieldInputProps<any> & FieldMetaProps<any> {
  return {
    ...formik.getFieldProps(name),
    ...formik.getFieldMeta(name),
  };
}

export function updateObject(o: any, u: any) {
  for (const [k, v] of Object.entries(u)) {
    if (typeof v === "object" && !isArray(v)) {
      o[k] = updateObject(o[k] || {}, v);
    } else {
      o[k] = v;
    }
  }

  return o;
}

export function getFieldPropsHelpers(
  formik: FormikProps<any>,
  name: string
): FieldHelperProps<any> & FieldInputProps<any> {
  return {
    ...formik.getFieldProps(name),
    ...formik.getFieldHelpers(name),
  };
}

export function getFieldPropsMetaHelpers(
  formik: FormikProps<any>,
  name: string
): FieldHelperProps<any> & FieldInputProps<any> & FieldMetaProps<any> {
  return {
    ...formik.getFieldProps(name),
    ...formik.getFieldHelpers(name),
    ...formik.getFieldMeta(name),
  };
}

export function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function normalizeEmail(text: string) {
  return text.toLowerCase();
}

const setValueToField = (fields: string[], value: Object) => {
  //@ts-ignore
  const reducer = (acc, item, index, arr) => ({
    [item]: index + 1 < arr.length ? acc : value,
  });
  return fields.reduceRight(reducer, {});
};

export function saveChangedValues(
  values:
    | Partial<InfoShape>
    | Partial<ExperienceShape>
    | Partial<SkillsShape>
    | Partial<MetaShape>,
  initialValues:
    | Partial<InfoShape>
    | Partial<ExperienceShape>
    | Partial<SkillsShape>
    | Partial<MetaShape>,
  url: string,
  updateFn: Function,
  objectWrapperStructure?: string[]
): void {
  const data = diff(initialValues, values)
    // eslint-disable-next-line
    ?.map((el) => {
      if (el.path) return el.path[0];
    })
    .reduce((tally, fts) => {
      // @ts-ignore
      tally[fts] = values[fts];
      return tally;
    }, {});

  const dataToSave =
    objectWrapperStructure && objectWrapperStructure.length > 0
      ? setValueToField(objectWrapperStructure, data)
      : data;

  updateFn(dataToSave);
  axios.patch(url, dataToSave).catch((err) => console.log(err));
}

export function sortSkillsGroups(
  order: number[],
  items: SkillsGroupShape[]
): SkillsGroupShape[] {
  const result = toJS(items).sort(
    (a, b) => order.indexOf(a.id) - order.indexOf(b.id)
  );
  return result;
}

export function sortExperienceUnits(
  order: number[],
  items: ExperienceUnitShape[]
): ExperienceUnitShape[] {
  const result = toJS(items).sort(
    (a, b) => order.indexOf(a.id) - order.indexOf(b.id)
  );
  return result;
}

export function blobToFile(theBlob: Blob, fileName: string): File {
  var b: any = theBlob;
  b.lastModifiedDate = new Date();
  b.name = fileName;

  return theBlob as File;
}

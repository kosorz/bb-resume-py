import {
  FieldInputProps,
  FieldMetaProps,
  FormikProps,
  FieldHelperProps,
} from "formik";
import { diff } from "deep-diff";
import { toJS } from "mobx";

import axios from "./axios";
import InfoShape from "../typings/Info.typing";
import ExperienceShape from "../typings/Experience.typing";
import SkillsShape from "../typings/Skills.typing";
import SkillsGroupShape from "../typings/SkillsGroup.typing";
import ExperienceUnitShape from "../typings/ExperienceUnit.typing";
import MetaShape, {
  ColorsShape,
  PaperShape,
  FontSizeShape,
} from "../typings/Meta.typing";

export function getFieldProps(
  formik: FormikProps<any>,
  name: string
): FieldInputProps<any> & FieldMetaProps<any> {
  return {
    ...formik.getFieldProps(name),
    ...formik.getFieldMeta(name),
  };
}

export function getManualFieldProps(
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
    | Partial<ColorsShape>
    | Partial<PaperShape>
    | Partial<FontSizeShape>
    | Pick<MetaShape, "fontFamily" | "background">,
  initialValues:
    | Partial<InfoShape>
    | Partial<ExperienceShape>
    | Partial<SkillsShape>
    | Partial<ColorsShape>
    | Partial<PaperShape>
    | Partial<FontSizeShape>
    | Pick<MetaShape, "fontFamily" | "background">,
  url: string,
  updateFn: Function,
  objectWrapperStructure?: string[]
): void {
  const dataToSave = diff(initialValues, values)
    ?.map((el) => {
      if (el.path) return el.path[0];
    })
    .reduce((tally, fts) => {
      // @ts-ignore
      tally[fts] = values[fts];
      return tally;
    }, {});

  axios
    .patch(
      url,
      objectWrapperStructure && objectWrapperStructure.length > 0
        ? setValueToField(objectWrapperStructure, dataToSave)
        : dataToSave
    )
    .then((res) => {
      updateFn(res.data);
    })
    .catch((err) => console.log(err));
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

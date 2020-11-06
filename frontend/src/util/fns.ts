import { createElement, FunctionComponent } from "react";
import { FieldInputProps, FieldMetaProps, FormikProps } from "formik";
import { diff } from "deep-diff";
import { toJS } from "mobx";

import axios from "./axios";
import InfoShape from "../typings/Info.typing";
import ExperienceShape from "../typings/Experience.typing";
import SkillsShape from "../typings/Skills.typing";
import SkillsGroupShape from "../typings/SkillsGroup.typing";
import ExperienceUnitShape from "../typings/ExperienceUnit.typing";

export function getFieldProps(
  formik: FormikProps<any>,
  name: string
): FieldInputProps<any> & FieldMetaProps<any> {
  return {
    ...formik.getFieldProps(name),
    ...formik.getFieldMeta(name),
  };
}

export function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function saveChangedValues(
  values: Partial<InfoShape> | Partial<ExperienceShape> | Partial<SkillsShape>,
  initialValues:
    | Partial<InfoShape>
    | Partial<ExperienceShape>
    | Partial<SkillsShape>,
  url: string,
  updateFn: Function
): void {
  const fieldsToSave = diff(initialValues, values)?.map((el) => {
    if (el.path) return el.path[0];
  });

  fieldsToSave &&
    axios
      .patch(
        url,
        fieldsToSave.reduce((tally, fts) => {
          // @ts-ignore
          tally[fts] = values[fts];
          return tally;
        }, {})
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

export function buildEditor(
  editor: FunctionComponent,
  condition: boolean | undefined,
  key?: string
) {
  if (condition) {
    return createElement(editor, { key });
  }

  return undefined;
}

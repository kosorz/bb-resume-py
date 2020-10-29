import { FieldInputProps, FieldMetaProps, FormikProps } from "formik";
import { diff } from "deep-diff";

import axios from "./axios";
import InfoShape from "../typings/Info.typing";
import ExperienceShape from "../typings/Experience.typing";
import SkillsShape from "../typings/Skills.typing";

export function getFieldProps(
  formik: FormikProps<any>,
  name: string
): FieldInputProps<any> & FieldMetaProps<any> {
  return {
    ...formik.getFieldProps(name),
    ...formik.getFieldMeta(name),
  };
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

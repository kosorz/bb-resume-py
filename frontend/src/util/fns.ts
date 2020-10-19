import { FieldInputProps, FieldMetaProps, FormikProps } from "formik";

export function getFieldProps(
  formik: FormikProps<any>,
  name: string
): FieldInputProps<any> & FieldMetaProps<any> {
  return { ...formik.getFieldProps(name), ...formik.getFieldMeta(name) };
}

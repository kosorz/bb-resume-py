import * as yup from "yup";

export const infoValidationSchema = yup.object().shape({
  phone: yup.string(),
  title: yup.string(),
  link: yup.string().url(),
  email: yup.string().email(),
  role: yup.string(),
  phone_enabled: yup.boolean().required(),
  link_enabled: yup.boolean().required(),
  email_enabled: yup.boolean().required(),
  location_enabled: yup.boolean().required(),
  role_enabled: yup.boolean().required(),
});

export const skillsValidationSchema = yup.object().shape({
  title: yup.string(),
});

export const skillsGroupValidationSchema = yup.object().shape({
  title: yup.string(),
  values: yup.array().of(yup.string()),
});

export const experienceValidationSchema = yup.object().shape({
  title: yup.string(),
});

export const previewValidationSchema = yup.object().shape({
  title: yup.string(),
});

export const experienceUnitValidationSchema = yup.object().shape({
  title: yup.string(),
  company_name_enabled: yup.boolean().required(),
  description_enabled: yup.boolean().required(),
  location_enabled: yup.boolean().required(),
  period_enabled: yup.boolean().required(),
  link_enabled: yup.boolean().required(),
  company_name: yup.string(),
  description: yup.string(),
  location: yup.string(),
  link: yup.string().url(),
});

export const loginValidationSchema = yup.object().shape({
  username: yup.string().required("Email is a required field."),
  password: yup.string().required(),
});

export const registerValidationSchema = yup.object().shape({
  username: yup.string().email().required("Email is a required field."),
  password: yup.string().required(),
  password_confirm: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Passwords must match")
    .required(),
});

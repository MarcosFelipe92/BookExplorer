import * as yup from "yup";

export const bookValidation = yup.object({
  title: yup.string().required(),
  authors: yup.string().required(),
  language: yup.string().required(),
});

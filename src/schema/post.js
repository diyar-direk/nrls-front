import * as yup from "yup";
import { allTyps } from "../constant/enums";
import { languages } from "../constant/languages";

export const postSchema = yup.object({
  featured_image: yup.mixed().notRequired(),

  title: yup.string().required("validation.required").max(500),
  excerpt: yup.string().notRequired(),
  content: yup.string().notRequired(),

  original_post: yup.object().nullable(),

  content_type: yup.string().required("validation.required").oneOf(allTyps),
  category: yup.object().required("validation.required"),
  tags: yup.array().of(yup.object()).notRequired(),
  author: yup.object().nullable(),

  language: yup
    .string()
    .required("validation.required")
    .oneOf(languages.map((e) => e.value)),

  is_published: yup.boolean().default(true),
  published_at: yup
    .date()
    .min(new Date())
    .when("is_published", {
      is: (v) => !v,
      then: (s) => s.required("validation.required"),
      otherwise: (s) => s.notRequired(),
    }),
});

export const postSchemaUpdate = yup.object({
  featured_image: yup.mixed().notRequired(),

  title: yup.string().required("validation.required").max(500),
  excerpt: yup.string().notRequired(),
  content: yup.string().notRequired(),

  original_post: yup.object().nullable(),

  content_type: yup.string().required("validation.required").oneOf(allTyps),
  category: yup.object().required("validation.required"),
  tags: yup.array().of(yup.object()).notRequired(),
  author: yup.object().nullable(),

  language: yup
    .string()
    .required("validation.required")
    .oneOf(languages.map((e) => e.value)),

  is_published: yup.boolean().default(true),
  published_at: yup.date().notRequired(),
});

import * as yup from "yup";
import { allTyps } from "../constant/enums";
import { languages } from "../constant/languages";

export const postSchema = yup.object({
  featured_image: yup.mixed().notRequired(),

  title: yup.string().required().max(500),
  excerpt: yup.string().notRequired(),
  content: yup.string().notRequired(),

  original_post: yup.object().nullable(),

  content_type: yup.string().required().oneOf(allTyps),
  category: yup.object().required(),
  tags: yup.array().of(yup.object()).notRequired(),
  author: yup.object().nullable(),

  language: yup
    .string()
    .required()
    .oneOf(languages.map((e) => e.value)),

  published_at: yup.date().notRequired(),
  is_published: yup.boolean().default(true),
});

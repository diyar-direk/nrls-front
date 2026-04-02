import * as yup from "yup";
export const commentSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().required().email(),
  comment: yup.string().required(),
  is_approved: yup.boolean().default(true),
});

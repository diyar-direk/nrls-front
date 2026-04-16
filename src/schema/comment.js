import * as yup from "yup";
export const commentSchema = yup.object({
  name: yup.string().required("validation.required"),
  email: yup.string().required("validation.required").email(),
  comment: yup.string().required("validation.required"),
  is_approved: yup.boolean().default(true),
});

import * as Yup from "yup";
export const authorSchema = Yup.object({
  full_name: Yup.string().required("validation.required").min(2),

  email: Yup.string().required("validation.required").email(),

  bio: Yup.string().notRequired(),

  profile_image: Yup.object().nullable(),
});

import * as Yup from "yup";
export const userSchema = Yup.object({
  username: Yup.string().required().min(2).max(20),

  full_name: Yup.string().required().min(2).max(20),

  email: Yup.string().required().email(),

  password: Yup.string().required().min(8).max(100),

  confirm_password: Yup.string()
    .oneOf([Yup.ref("password"), null])
    .required(),

  is_active: Yup.boolean().default(false),
});

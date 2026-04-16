import * as Yup from "yup";
export const userSchema = Yup.object({
  username: Yup.string().required("validation.required").min(2,"validation.min_length").max(20,"validation.max_length"),

  full_name: Yup.string().required("validation.required").min(2,"validation.min_length").max(20,"validation.max_length"),

  email: Yup.string().required("validation.required").email("validation.email"),

  password: Yup.string().required("validation.required").min(8,"validation.min_password").max(100,"validation.max_password"),

  confirm_password: Yup.string()
    .oneOf([Yup.ref("password"), null],"validation.password_match")
    .required("validation.required"),
 

  is_active: Yup.boolean().default(false),
});

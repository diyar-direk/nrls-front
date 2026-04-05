import * as Yup from "yup";

export const mediaSchema = Yup.object().shape({
  files: Yup.array().of(
    Yup.object().shape({
      file_type: Yup.string().required(),

      external_url: Yup.string().when("file_type", {
        is: "video",
        then: (schema) =>
          schema
            .required("external_url is required for video")
            .url("must be a valid url"),
        otherwise: (schema) => schema.notRequired(),
      }),

      src: Yup.mixed().when("file_type", {
        is: (val) => val !== "video",
        then: (schema) => schema.required("file is required"),
        otherwise: (schema) => schema.notRequired(),
      }),

      alt_text: Yup.string().notRequired(),

      caption: Yup.string().notRequired(),
    }),
  ),
});

export const mediaSchemaUpdate = Yup.object().shape({
  files: Yup.array().of(
    Yup.object().shape({
      file_type: Yup.string().required(),

      external_url: Yup.string().when("file_type", {
        is: "video",
        then: (schema) =>
          schema
            .required("external_url is required for video")
            .url("must be a valid url"),
        otherwise: (schema) => schema.notRequired(),
      }),

      src: Yup.mixed().notRequired(),

      alt_text: Yup.string().notRequired(),

      caption: Yup.string().notRequired(),
    }),
  ),
});

import * as yup from "yup";
import { eventType } from "../constant/enums";

export const eventsSchema = yup.object({
  post: yup.object().required("validation.required"),
  event_type: yup.string().required("validation.required").oneOf(eventType),
  event_date: yup.date().required("validation.required").min(new Date()),
  location: yup.string().required("validation.required"),
  attendess_count: yup.number().notRequired(),
});

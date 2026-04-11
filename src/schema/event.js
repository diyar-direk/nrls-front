import * as yup from "yup";
import { eventType } from "../constant/enums";

export const eventsSchema = yup.object({
  post: yup.object().required(),
  event_type: yup.string().required().oneOf(eventType),
  event_date: yup.date().required().min(new Date()),
  location: yup.string().required(),
  attendess_count: yup.number().notRequired(),
});

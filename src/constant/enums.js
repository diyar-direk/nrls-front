const contentType = [
  "text",
  "infographic",
  "video",
  "documentary",
  "report",
  "survey",
  "publication",
  "event",
];
const publicationType = ["magazine", "book"];

const eventType = ["dialogue_session", "forum", "meeting", "center_news"];

const mediaFileType = ["image", "video", "pdf", "audio"];

const allTyps = [...contentType, ...publicationType, ...eventType];

export { contentType, publicationType, eventType, mediaFileType, allTyps };

import { contactRouter } from "../contact_us/router/router";
import { homePageRouter } from "../home/router/router";
import { aboutRouter } from "./../about/router/router";
import { loginRouter } from "./../login/router/router";
import { authorRouter } from "./../author/router/router";

export const mainRouter = [
  homePageRouter,
  aboutRouter,
  contactRouter,
  loginRouter,
  ...authorRouter,
];

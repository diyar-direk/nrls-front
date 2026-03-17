import { icons } from "./icons";

const homeRoutes = {
  about: "/about",
  contact: "/contact_us",
  login: "/login",
  dashboard: "/dashboard",
};

const dashboardRouts = {
  user: {
    page: `${homeRoutes.dashboard}/users`,
    add: `${homeRoutes.dashboard}/users/add`,
    update: (id = ":id") => `${homeRoutes.dashboard}/users/${id}`,
  },
};

const dashboardPages = [
  {
    title: "users",
    to: dashboardRouts.user.page,
    icon: icons.users,
  },
  {
    title: "add user",
    to: dashboardRouts.user.add,
    icon: icons.addUser,
  },
];

export { homeRoutes, dashboardPages, dashboardRouts };

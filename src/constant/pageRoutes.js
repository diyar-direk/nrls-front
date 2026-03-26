import { icons } from "./icons";

const homeRoutes = {
  about: "/about",
  contact: "/contact_us",
  login: "/login",
  dashboard: "/dashboard",
  author: {
    view: (id = ":id") => `/author/${id}`,
  },
};

const dashboardRouts = {
  user: {
    page: `${homeRoutes.dashboard}/users`,
    add: `${homeRoutes.dashboard}/users/add`,
    update: (id = ":id") => `${homeRoutes.dashboard}/users/${id}`,
  },
  author: {
    page: `${homeRoutes.dashboard}/authors`,
    add: `${homeRoutes.dashboard}/authors/add`,
    view: (id = ":id") => `${homeRoutes.dashboard}/authors/${id}`,
    update: (id = ":id") => `${homeRoutes.dashboard}/authors/${id}/update`,
  },
  tag: {
    page: `${homeRoutes.dashboard}/tags`,
    add: `${homeRoutes.dashboard}/tags/add`,
    update: (id = ":id") => `${homeRoutes.dashboard}/tags/${id}`,
  },
  category: {
    page: `${homeRoutes.dashboard}/categories`,
    add: `${homeRoutes.dashboard}/categories/add`,
    update: (id = ":id") => `${homeRoutes.dashboard}/categories/${id}`,
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
  {
    title: "tags",
    to: dashboardRouts.tag.page,
    icon: icons.tags,
  },
  {
    title: "categories",
    to: dashboardRouts.category.page,
    icon: icons.category,
  },
  {
    title: "authors",
    to: dashboardRouts.author.page,
    icon: icons.author,
  },
];

export { homeRoutes, dashboardPages, dashboardRouts };

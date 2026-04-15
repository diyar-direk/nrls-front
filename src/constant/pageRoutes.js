import { icons } from "./icons";

const homeRoutes = {
  about: "/about",
  contact: "/contact_us",
  login: "/login",
  dashboard: "/dashboard",
  author: {
    view: (id = ":id") => `/author/${id}`,
  },
  posts: {
    page: (name = ":name") => `/${name}`,
    view: (name = ":name", id = ":id") => `/${name}/${id}`,
    viewSurvey: (name = ":name", id = ":id") => `/${name}/${id}/survey`,
    events: (name = ":name", id = ":id") => `/${name}/${id}/events`,
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
  backup: {
    page: `${homeRoutes.dashboard}/backup`,
  },
  category: {
    page: `${homeRoutes.dashboard}/categories`,
    add: `${homeRoutes.dashboard}/categories/add`,
    update: (id = ":id") => `${homeRoutes.dashboard}/categories/${id}`,
  },
  events: {
    page: `${homeRoutes.dashboard}/events`,
    add: `${homeRoutes.dashboard}/events/add`,
    update: (id = ":id") => `${homeRoutes.dashboard}/events/${id}`,
  },
  post: {
    page: `${homeRoutes.dashboard}/posts`,
    add: `${homeRoutes.dashboard}/posts/add`,
    view: (id = ":id") => `${homeRoutes.dashboard}/posts/${id}`,
    update: (id = ":id") => `${homeRoutes.dashboard}/posts/${id}/update`,
    viewSurvey: (id = ":id") => `${homeRoutes.dashboard}/posts/${id}/survey`,
    events: (id = ":id") => `${homeRoutes.dashboard}/posts/${id}/events`,
    addSurvey: (post = ":post") =>
      `${homeRoutes.dashboard}/posts/${post}/survey/add`,
    updateSurvey: (post = ":post", id = ":id") =>
      `${homeRoutes.dashboard}/posts/${post}/survey/${id}`,
  },
};

const dashboardPages = [
  {
    title: "pages.dashboard",
    to: homeRoutes.dashboard,
    icon: icons.dashboard,
  },
  {
    title: "pages.users",
    to: dashboardRouts.user.page,
    icon: icons.users,
  },
  {
    title: "pages.add_user",
    to: dashboardRouts.user.add,
    icon: icons.addUser,
  },
  {
    title: "pages.posts",
    to: dashboardRouts.post.page,
    icon: icons.posts,
  },
  {
    title: "pages.events",
    to: dashboardRouts.events.page,
    icon: icons.events,
  },
  {
    title: "pages.add_post",
    to: dashboardRouts.post.add,
    icon: icons.add,
  },
  {
    title: "pages.tags",
    to: dashboardRouts.tag.page,
    icon: icons.tags,
  },
  {
    title: "pages.categories",
    to: dashboardRouts.category.page,
    icon: icons.category,
  },
  {
    title: "pages.authors",
    to: dashboardRouts.author.page,
    icon: icons.author,
  },
  {
    title: "pages.backup",
    to: dashboardRouts.backup.page,
    icon: icons.backup,
  },
];

const searchPages = [
  ...dashboardPages,
  { title: "add_author", to: dashboardRouts.author.add },
  { title: "add_tag", to: dashboardRouts.tag.add },
  { title: "add_category", to: dashboardRouts.category.add },
  { title: "add_event", to: dashboardRouts.events.add },
  { title: "home", to: "/" },
];

export { homeRoutes, dashboardPages, dashboardRouts, searchPages };

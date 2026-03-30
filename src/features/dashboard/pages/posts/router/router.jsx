import { lazy } from "react";
import { dashboardRouts } from "../../../../../constant/pageRoutes";
import PageFallback from "./../../../../../components/PageFallBack";
const AllPosts = lazy(() => import("../pages/AllPosts"));
const AddPost = lazy(() => import("../pages/AddPost"));
const UpdatePost = lazy(() => import("../pages/UpdatePost"));

export const postsRouter = [
  {
    path: dashboardRouts.post.page,
    element: (
      <PageFallback>
        <AllPosts />
      </PageFallback>
    ),
  },
  {
    path: dashboardRouts.post.add,
    element: (
      <PageFallback>
        <AddPost />
      </PageFallback>
    ),
  },
  {
    path: dashboardRouts.post.update(),
    element: (
      <PageFallback>
        <UpdatePost />
      </PageFallback>
    ),
  },
];

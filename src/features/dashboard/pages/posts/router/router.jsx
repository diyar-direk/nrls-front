import { lazy } from "react";
import { dashboardRouts } from "../../../../../constant/pageRoutes";
import PageFallback from "./../../../../../components/PageFallBack";
const AllPosts = lazy(() => import("../pages/AllPosts"));
const AddPost = lazy(() => import("../pages/AddPost"));

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
];

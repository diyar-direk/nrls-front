import { lazy } from "react";
import { homeRoutes } from "../../../../constant/pageRoutes";
import PageFallback from "./../../../../components/PageFallBack";
const AuthorPage = lazy(() => import("../pages/AuthorPage"));

export const authorRouter = [
  {
    path: homeRoutes.author.view(),
    element: (
      <PageFallback>
        <AuthorPage />
      </PageFallback>
    ),
  },
];

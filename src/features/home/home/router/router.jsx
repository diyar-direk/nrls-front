import { lazy } from "react";
import PageFallback from "./../../../../components/PageFallBack";
const Home = lazy(() => import("../page/Home"));
export const homePageRouter = {
  path: "/",
  element: (
    <PageFallback>
      <Home />
    </PageFallback>
  ),
};

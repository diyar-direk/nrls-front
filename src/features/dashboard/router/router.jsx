import ProtectedRoute from "../../../components/ProtectedRoute";
import { homeRoutes } from "../../../constant/pageRoutes";
import DasboardLayout from "../components/DasboardLayout";
import { authorRouter } from "../pages/authers/router/router";
import { backupRouter } from "../pages/backup/router/router";
import { categoryRouter } from "../pages/categories/router/router";
import { postsRouter } from "../pages/posts/router/router";
import { tagsRouter } from "../pages/tages/router/router";
import { usersRouter } from "../pages/users/router/router";

export const dashboardRouter = [
  {
    path: homeRoutes.dashboard,
    element: (
      <ProtectedRoute>
        <DasboardLayout />
      </ProtectedRoute>
    ),
    children: [
      ...usersRouter,
      ...tagsRouter,
      ...categoryRouter,
      ...authorRouter,
      ...postsRouter,
      ...backupRouter,
    ],
  },
];

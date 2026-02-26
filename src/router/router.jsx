import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./../components/Layout";
import { mainRouter } from "./../features/home/router/router";

const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: mainRouter,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default AppRouter;

import {
  createBrowserRouter,
  RouterProvider,
  ScrollRestoration,
} from "react-router";
import Layout from "./../components/Layout";
import { mainRouter } from "./../features/home/router/router";
import { dashboardRouter } from "../features/dashboard/router/router";
import { AuthProvider } from "../context/AuthContext";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

const AppRouter = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    if (i18n.language === "ar") return document.body.classList.add("arabic");
    return document.body.classList.remove("arabic");
  }, [i18n.language]);

  const router = createBrowserRouter([
    {
      element: (
        <>
          <ScrollRestoration />
          <AuthProvider />
        </>
      ),
      children: [
        {
          path: "/",
          element: <Layout />,
          children: mainRouter,
        },
        ...dashboardRouter,
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default AppRouter;

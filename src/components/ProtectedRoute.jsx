import { Navigate } from "react-router";
import AuthHelper from "../utils/authHelper";
import DashboarLayout from "../sections/dashboard/components/DashboarLayout";
import { pagesRoute } from "../constants/links";

const ProtectedRoute = () => {
  const isAuthenticated = new AuthHelper().isAuthenticated();
  if (isAuthenticated) return <DashboarLayout />;

  return <Navigate to={pagesRoute.login} replace />;
};

export default ProtectedRoute;

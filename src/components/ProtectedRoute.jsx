import { Navigate } from "react-router";
import AuthHelper from "../utils/authHelper";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = new AuthHelper().isAuthenticated();
  
  if (!isAuthenticated) return <Navigate to={"/"} replace />;

  return children;
};

export default ProtectedRoute;

import { useAuth } from "../context/AuthContext";

const ValidateRoleForElement = ({ children, roles = [] }) => {
  const { user } = useAuth();
  const { role } = user || {};
  if (roles.includes(role)) return children;
};

export default ValidateRoleForElement;

import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
export const RequireAuth = ({ children }) => {
  const auth = useAuth();
  if (!auth.user) {
    return <Navigate to='/signin' />;
  }
  return children;
};

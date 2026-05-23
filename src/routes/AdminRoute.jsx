import { Navigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

import LoadingSpinner from "../shared/LoadingSpinner";

const AdminRoute = ({ children }) => {

  const { user, loading } = useAuth();

  const [role, roleLoading] = useRole();

  if (loading || roleLoading) {
    return <LoadingSpinner />;
  }

  if (user && role === 'admin') {
    return children;
  }

  return <Navigate to='/' />;
};

export default AdminRoute;
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext/AuthContext";

export default function RequireRole({ roles, children }) {
  const { user } = useAuth();

  if (!roles.includes(user?.role)) {
    return <Navigate to="/app/dashboard" replace />;
  }

  return children;
}

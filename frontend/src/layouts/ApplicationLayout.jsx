import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext/AuthContext";

export default function ApplicationLayout() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
}

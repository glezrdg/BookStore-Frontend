import React from "react";
import { useAuth } from "../../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  allowedRoles: string[]; // List of roles that can access the route
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />; // Redirect to login if not authenticated
  }

  if (user && allowedRoles.includes(user.role)) {
    return <Outlet />; // Render the route if the user's role is allowed
  }

  return <Navigate to="/unauthorized" />; // Redirect if user is not authorized
};

export default ProtectedRoute;

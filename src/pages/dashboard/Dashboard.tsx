import React from "react";
import { useAuth } from "../../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import Admin from "./components/Admin";
import Librarian from "./components/Librarian";

const Dashboard: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();

  const navigate = useNavigate();
  if (!isAuthenticated) {
    return <Navigate to="/login" />; // Redirect to login if not authenticated
  }

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="dashboard">
      <h1>Welcome, {user ? user.username : "Guest"}!</h1>

      <div>
        {/* Conditionally render components based on user role */}
        {user?.role === "admin" && <Admin />} {/* Component A for Admin */}
        {user?.role === "bibliotecario" && <Librarian />}{" "}
        {/* Component B for Librarian */}
      </div>

      <button
        onClick={handleLogout}
        className="bg-red-500 text-white p-2 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;

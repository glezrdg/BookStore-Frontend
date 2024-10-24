import React from "react";
import { useAuth } from "../../context/AuthContext";

import Admin from "./components/Admin/Admin";
import Librarian from "./components/Librarian/Librarian";
import { DashboardProvider } from "./context/DashboardProvider";

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <DashboardProvider>
      <div className="py-20">
        {user?.role === "admin" && <Admin />}
        {user?.role === "librarian" && <Librarian />}{" "}
      </div>
    </DashboardProvider>
  );
};

export default Dashboard;

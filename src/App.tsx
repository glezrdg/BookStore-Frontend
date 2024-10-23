import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home"; // Public route to display books
import Dashboard from "./pages/dashboard/Dashboard"; // Role-based dashboard
import Login from "./pages/login/Login";
import ProtectedRoute from "./ProtectedRoute"; // For authenticated users
import { AuthProvider } from "./context/AuthContext";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
         <Routes>
          {/* Public Route */}
          <Route path="/" element={<Home />} />  {/* Books gallery is public */}
          <Route path="/login" element={<Login />} />

          {/* Protected Dashboard Route */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;

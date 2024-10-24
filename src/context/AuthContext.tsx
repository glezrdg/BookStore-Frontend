import React, { createContext, useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";
import { User } from "../models/user.model"; // Import User model
import { LoginFormData } from "../models/loginFormData.model"; // Import LoginFormData model
import { loginRequest, verifyTokenRequest } from "../services/auth"; // Import auth service functions

// Define the shape of our context state
interface AuthContextType {
  user: User | null;
  login: (data: LoginFormData) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean; // Handle async state
}

// Custom hook for using the AuthContext
export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

// AuthProvider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true); // New loading state

  // Fetch user data on component mount if token is present
  useEffect(() => {
    const checkLogin = async () => {
      const token = Cookies.get("token"); // Get token from cookies
      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        const res = await verifyTokenRequest(); // Verify token with backend
        if (!res.data) {
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }

        setIsAuthenticated(true);
        setUser(res.data); // Set user data from response
        setLoading(false);
      } catch (error) {
        console.error("Token verification failed:", error);
        setIsAuthenticated(false);
        setLoading(false);
      }
    };
    checkLogin();
  }, []);

  // Login function
  const login = async (data: LoginFormData) => {
    try {
      const response = await loginRequest(data); // Use loginRequest from auth service
      const { token, ...userData } = response.data;

      // Store token in cookies
      Cookies.set("token", token, {
        expires: 1,
        sameSite: "none",
        secure: true,
      }); // 1 day expiry

      // Update state with user data
      setUser(userData);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  // Logout function
  const logout = () => {
    // Clear token and reset state
    Cookies.remove("token", { sameSite: "none", secure: true });
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

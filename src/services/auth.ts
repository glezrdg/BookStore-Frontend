import axios from "./axios"; // Use the axios instance you created
import { LoginFormData } from "../models/loginFormData.model"; // Import the correct types
import { API_URL } from "../config";

// Register Request
export const registerRequest = async (user: LoginFormData) => {
  // Explicitly type 'user'
  return axios.post("/auth/register", user);
};

// Login Request
export const loginRequest = async (user: LoginFormData) => {
  // Explicitly type 'user'
  return axios.post("/auth/login", user);
};

// Verify Token Request
export const verifyTokenRequest = (token: string) => {
  return axios.get(`${API_URL}/auth/verify`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

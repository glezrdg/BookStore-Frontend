import axios from "./axios"; // Use the pre-configured axios instance
import { LoginFormData } from "../models/loginFormData.model"; // Import LoginFormData model

// Register Request (if needed in the future)
export const registerRequest = async (user: LoginFormData) => {
  return axios.post("/auth/register", user); // Use axios instance
};

// Login Request
export const loginRequest = async (user: LoginFormData) => {
  return axios.post("/auth/login", user); // Send login request to backend
};

// Verify Token Request
export const verifyTokenRequest = async () => {
  return axios.get("/auth/verify"); // Verify token with cookies included
};

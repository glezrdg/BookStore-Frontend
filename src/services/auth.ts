import axios from "./axios"; // Use the axios instance you created
import { LoginFormData } from "../models/loginFormData.model"; // Import the correct types

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

export const verifyTokenRequest = async () => {
  return axios.get("/auth/verify"); // Cookies should be included automatically
};

import axios from "axios";
import { API_URL } from "../config"; // Import the API_URL from config

// Create an Axios instance
const instance = axios.create({
  baseURL: API_URL, // Base URL from config
  withCredentials: true, // Include credentials (cookies) with requests
});

export default instance;

// src/services/user.ts
import axios from "./axios";
import { User, UserFormData } from "../models/user.model";

export const getUsers = async () => {
  return await axios.get<User[]>("/users");
};

export const createUser = async (user: UserFormData) => {
  return await axios.post("/users", user);
};

export const updateUser = async (userId: string, user: User) => {
  return await axios.put(`/users/${userId}`, user);
};

export const deleteUser = async (userId: string) => {
  return await axios.delete(`/users/${userId}`);
};

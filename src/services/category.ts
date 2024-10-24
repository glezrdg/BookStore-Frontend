import { CategoryFormData, CategoryStrict } from "../models/category.model";
import axios from "./axios";

export const getCategories = () => axios.get<CategoryStrict[]>("/categories");

export const createCategory = (category: CategoryFormData) =>
  axios.post<CategoryFormData>("/categories", category);

export const updateCategory = (id: string, category: CategoryStrict) =>
  axios.put<CategoryStrict>(`/categories/${id}`, category);

export const deleteCategory = (id: string) =>
  axios.delete<CategoryStrict>(`/categories/${id}`);

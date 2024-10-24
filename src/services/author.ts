import { Author, AuthorFormData, AuthorStrict } from "../models/author.model";
import axios from "./axios"; // Axios instance

// Fetch all authors
export const getAuthors = async () => {
  return await axios.get("/authors");
};
export const getAuthorById = async (id: string) =>
  await axios.get(`/authors/${id}`);

// Create a new author
export const createAuthor = async (author: Author) => {
  return await axios.post<AuthorFormData>("/authors", author);
};

export const updateAuthor = async (id: string, author: AuthorStrict) =>
  await axios.put(`/authors/${id}`, author);

export const deleteAuthor = async (authorId: string): Promise<void> => {
  await axios.delete(`/authors/${authorId}`);
};

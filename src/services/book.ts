import {  BookFormData, BookStrict } from "../models/book.model";
import axios from "./axios";

export const getBooks = () => axios.get("/books");
export const createBook = (book: BookFormData) => axios.post("/books", book);
export const updateBook = (id: string, book: BookStrict) =>
  axios.put(`/books/${id}`, book);
export const deleteBook = (id: string) => axios.delete(`/books/${id}`);

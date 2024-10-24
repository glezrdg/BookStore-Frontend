import React, { createContext, useContext, useState, useEffect } from "react";
import {
  getAuthors,
  createAuthor,
  deleteAuthor,
  getAuthorById,
  updateAuthor,
} from "../../../services/author";
import { Author, AuthorFormData } from "../../../models/author.model";

interface AuthorsContextType {
  authors: Author[];
  getAllAuthors: () => Promise<void>;
  getOneAuthor: (id: string) => Promise<Author | null>;
  addAuthor: (author: AuthorFormData) => Promise<void>;
  editAuthor: (id: string, author: AuthorFormData) => Promise<void>;
  removeAuthor: (id: string) => Promise<void>;
  loading: boolean;
  error: string | null;
}

const AuthorsContext = createContext<AuthorsContextType | null>(null);

export const useAuthors = () => {
  const context = useContext(AuthorsContext);
  if (!context)
    throw new Error("useAuthors must be used within an AuthorsProvider");
  return context;
};

export const AuthorsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getAllAuthors = async () => {
    setLoading(true);
    try {
      const { data } = await getAuthors();
      setAuthors(data);
    } catch (error) {
      console.log(error);
      setError("Failed to load authors");
    } finally {
      setLoading(false);
    }
  };

  const getOneAuthor = async (id: string) => {
    setLoading(true);
    try {
      const { data } = await getAuthorById(id);
      return data;
    } catch (error) {
      console.log(error);
      setError("Failed to fetch author");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const addAuthor = async (author: AuthorFormData) => {
    try {
      const { data } = await createAuthor(author);
      setAuthors((prevAuthors) => [...prevAuthors, data]);
    } catch (error) {
      console.log(error);
      setError("Failed to create author");
    }
  };

  const editAuthor = async (id: string, author: AuthorFormData) => {
    try {
      const { data } = await updateAuthor(id, author);
      setAuthors((prevAuthors) =>
        prevAuthors.map((a) => (a._id === id ? data : a))
      );
    } catch (error) {
      console.log(error);
      setError("Failed to update author");
    }
  };

  const removeAuthor = async (id: string) => {
    try {
      await deleteAuthor(id);
      setAuthors((prevAuthors) =>
        prevAuthors.filter((author) => author._id !== id)
      );
    } catch (error) {
      console.log(error);
      setError("Failed to delete author");
    }
  };

  useEffect(() => {
    getAllAuthors();
  }, []);

  return (
    <AuthorsContext.Provider
      value={{
        authors,
        getAllAuthors,
        getOneAuthor,
        addAuthor,
        editAuthor,
        removeAuthor,
        loading,
        error,
      }}
    >
      {children}
    </AuthorsContext.Provider>
  );
};

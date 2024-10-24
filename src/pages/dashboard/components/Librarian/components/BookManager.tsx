import React, { useState, useEffect } from "react";
import {
  getBooks,
  createBook,
  updateBook,
  deleteBook,
} from "../../../../../services/book";
import { useCategories } from "../../../context/CategoryContext"; // Importa el contexto de categorías
import { useAuthors } from "../../../context/AuthorsContext"; // Importa el contexto de autores
import GeneralTable from "../../../../../components/Table";
import GeneralForm from "../../../../../components/Form";
import {
  Book,
  BookFormData,
  BookStrict,
} from "../../../../../models/book.model";

const bookSchema = [
  { key: "title", label: "Title", type: "text" },
  { key: "description", label: "Description", type: "text" },
  { key: "categories", label: "Categories", type: "select" }, // Select para las categorías
  { key: "authors", label: "Authors", type: "select-multiple" }, // Select para los autores
  { key: "publishedDate", label: "Published Date", type: "date" },
];

const BookManager = () => {
  const [books, setBooks] = useState<BookStrict[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedBook, setSelectedBook] = useState<Partial<Book> | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Usa el contexto de categorías
  const {
    categories,
    loading: categoryLoading,
    error: categoryError,
  } = useCategories();

  // Usa el contexto de autores
  const { authors, loading: authorLoading, error: authorError } = useAuthors();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const { data } = await getBooks();
        setBooks(data);
      } catch (error) {
        console.log(error);
        setError("Failed to fetch books");
      }
    };

    fetchBooks();
  }, []);

  const handleEdit = (book: Book) => {
    setSelectedBook(book);
    setShowModal(true);
  };

  const handleAdd = () => {
    setSelectedBook(null);
    setShowModal(true);
  };

  const handleDelete = async (book: Book) => {
    try {
      if (book._id) await deleteBook(book._id);
      setBooks((prevBooks) => prevBooks.filter((b) => b._id !== book._id));
    } catch (error) {
      console.log(error);
      setError("Failed to delete book");
    }
  };

  const handleFormSubmit = async (book: BookStrict) => {
    if ("_id" in book) {
      await updateBook(book._id, book);
      setBooks((prevBooks) =>
        prevBooks.map((b) => (b._id === book._id ? book : b))
      );
      setShowModal(false);
    } else {
      console.log(book);
      const res: any = await createBook(book);
      setBooks((prevBooks) => [...prevBooks, res.data.book]);
      setShowModal(false);
    }
    setSelectedBook(null);
  };

  return (
    <div>
      <div className="w-full flex justify-between p-4 relative mt-20">
        <h1 className="text-xl font-semibold ">Book Manager</h1>
        <button
          className="bg-blue-600 text-white rounded-lg shadow-sm px-4 py-2"
          onClick={handleAdd}
        >
          Add Book
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {categoryError && <p className="text-red-500">{categoryError}</p>}
      {authorError && <p className="text-red-500">{authorError}</p>}

      <GeneralTable<BookStrict>
        columns={[
          { key: "title", label: "Title" },
          { key: "description", label: "Description" },
          { key: "categories", label: "Categories" }, // Select para las categorías
          { key: "authors", label: "Authors" }, // Select para los autores
          { key: "publishedDate", label: "Published Date" },
        ]}
        data={books}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      {showModal && (
        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm grid place-content-center">
          <div className="bg-blue-700 text-white p-5 opacity-100 flex flex-col">
            <h2>{selectedBook ? "Edit Book" : "Add Book"}</h2>
            <GeneralForm
              schema={bookSchema}
              initialData={
                selectedBook || {
                  title: "",
                  description: "",
                  authors: [], // Prepara el campo de autores
                  categories: [], // Prepara el campo de categorías
                  publishedDate: "",
                }
              }
              categories={categories} // Pasa las categorías obtenidas por el contexto
              authors={authors} // Pasa los autores obtenidos por el contexto
              onSubmit={handleFormSubmit}
            />
            <button
              className="bg-red-600 px-4 text-white self-end"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookManager;

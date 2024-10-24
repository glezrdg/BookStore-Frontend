import React from "react";
import { Book } from "../../../models/book.model";

interface BookModalProps {
  book: Book;
  onClose: () => void;
}

const BookModal: React.FC<BookModalProps> = ({ book, onClose }) => {
  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 z-50 backdrop-blur-sm grid place-content-center ">
      <div className="bg-white rounded-md shadow-lg p-10 flex flex-col">
        <h2 className="my-4 font-semibold text-3xl">{book.title}</h2>
        <p>Description: {book.description}</p>
        <p>Published: {book.publishedDate}</p>
        <button
          onClick={onClose}
          className="self-end bg-red-600 text-white rounded-md px-4 py-2 mt-10  "
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default BookModal;

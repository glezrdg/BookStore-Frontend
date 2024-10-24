import React from "react";
import AuthorManager from "./components/AuthorManager";
import BookManager from "./components/BookManager";

const EditAuthor: React.FC = () => {
  return (
    <div className="container mx-auto">
      <h2 className="text-4xl font-bold">Librarian</h2>
      <AuthorManager />
      <BookManager />
    </div>
  );
};

export default EditAuthor;

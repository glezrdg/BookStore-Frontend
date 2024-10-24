import React from "react";
// import { AuthorsProvider } from "./AuthorsContext";
import { BooksProvider } from "./BooksContext"; // CategoriesProvider and UsersProvider can also be added here
import { CategoryProvider } from "./CategoryContext";
import { AuthorsProvider } from "./AuthorsContext";

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <CategoryProvider>

      <AuthorsProvider>
        <BooksProvider>
          {/* You can add other providers for categories, users, etc. */}
          {children}
        </BooksProvider>
      
      </AuthorsProvider>
    </CategoryProvider>
  );
};

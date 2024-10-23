export interface Book {
  id: string;
  title: string;
  authors: string[]; // Array of author IDs
  categories: string[]; // Array of category IDs
  publishedDate: string; // Use ISO 8601 format (e.g., "2024-01-01")
  description: string;
}

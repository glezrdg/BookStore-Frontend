import { Author } from "./author.model";
import { Category } from "./category.model";

export interface Book {
  _id?: string;
  title: string;
  authors: Author[];
  categories: Category[];
  description: string;
  publishedDate: string;
}

export interface BookFormData {
  title: string;
  authors: Author[];
  categories: Category[];
  description: string;
  publishedDate: string;
}

export interface BookStrict {
  _id: string;
  title: string;
  authors: Author[];
  categories: Category[];
  description: string;
  publishedDate: string;
}

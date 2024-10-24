export interface Author {
  _id?: string;
  name: string;
  bio?: string; // Optional biography
}
export interface AuthorStrict {
  _id: string;
  name: string;
  bio?: string; // Optional biography
}
export interface AuthorFormData {
  name: string;
  bio?: string;
}

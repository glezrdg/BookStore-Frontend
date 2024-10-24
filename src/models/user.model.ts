export interface User {
  _id: string;
  username: string;
  email: string;
  role: "admin" | "librarian"; // Adjust the roles as needed
}

export interface UserFormData {
  username: string;
  email: string;
  role: string;
}

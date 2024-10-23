export interface User {
  id: string;
  username: string;
  email: string;
  role: "admin" | "bibliotecario"; // Adjust the roles as needed
}

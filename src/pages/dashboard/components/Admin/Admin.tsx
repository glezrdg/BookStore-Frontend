
import CategoryManager from "./components/CategoryManager";
import UserManager from "./components/UserManager";

function Admin() {
  return (
    <div className="container mx-auto">
      <h2 className="text-4xl font-bold">Admin</h2>
      <div>
        <CategoryManager />
      </div>
      <div>
        <UserManager />
      </div>
    </div>
  );
}

export default Admin;

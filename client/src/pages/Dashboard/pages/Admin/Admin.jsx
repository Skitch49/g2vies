import { Outlet } from "react-router-dom";

function Admin() {
  return (
    <div>
      <h1>Admin dashboard</h1>
      <Outlet />
    </div>
  );
}
export default Admin;

import { useContext } from "react";
import { AuthContext } from "../../../../context";
import { Navigate } from "react-router-dom";

function ProtectedAdminRoute({ children }) {
  const { user } = useContext(AuthContext);

  return user._id === import.meta.env.VITE_ADMIN_ID ? (
    children
  ) : (
    <Navigate to="/dashboard/profile" />
  );
}
export default ProtectedAdminRoute;

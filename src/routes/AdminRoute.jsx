import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import useAdmin from "../hooks/useAdmin";

function AdminRoute({ children }) {
  const { user, loading } = useAuth();
  const [isAdmin, isPending] = useAdmin();
  const location = useLocation();

  if (loading || isPending)
    return (
      <div className="flex justify-center items-center">
        Loading..............
      </div>
    );

  if (user && isAdmin) return children;

  return <Navigate to="/login" state={location.pathname} />;
}

export default AdminRoute;

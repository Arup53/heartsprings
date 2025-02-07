import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
// import LoadingSpinner from "../components/LoadingSpinner";

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();

  const location = useLocation();

  if (loading)
    return (
      <div className="flex justify-center items-center">
        Loading..............
      </div>
    );

  if (user) return children;

  return <Navigate to="/login" state={location.pathname} />;
}

export default PrivateRoute;

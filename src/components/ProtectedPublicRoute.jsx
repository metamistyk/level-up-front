import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedPublicRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    // Si ya está logueado → volver a Home
    return <Navigate to="/" replace />;
  }

  return children;
}

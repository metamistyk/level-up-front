import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children, role }) {
  let user = null;

  try {
    const storedUser = localStorage.getItem("user");
    if (storedUser && storedUser !== "undefined") {
      user = JSON.parse(storedUser);
    }
  } catch {
    user = null;
  }

  // Si no está logueado → lo manda al login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Si la ruta requiere rol → validarlo
  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  // Permitir pasar
  return children;
}

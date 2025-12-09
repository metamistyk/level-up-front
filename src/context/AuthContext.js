import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Carga segura desde localStorage al iniciar la app
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("token");

      if (storedUser && storedUser !== "undefined") {
        setUser(JSON.parse(storedUser));
      }

      if (storedToken && storedToken !== "undefined") {
        setToken(storedToken);
      }
    } catch (error) {
      console.error("Error al cargar datos de autenticación:", error);
      setUser(null);
      setToken(null);
    }
  }, []);

  // LOGIN usando JWT
  const login = async (email, password) => {
    const response = await fetch("http://localhost:8080/api/auth/login-jwt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Credenciales incorrectas");
    }

    const data = await response.json();
    // data = { token: "...", user: { id, username, email, role } }

    // Guardar en localStorage
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("token", data.token);

    // Guardar en estado
    setUser(data.user);
    setToken(data.token);
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };

  // ROLES / ESTADO
  const isAuthenticated = !!user;
  const isAdmin = user?.role === "ADMIN";

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        isAdmin,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

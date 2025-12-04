import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Carga segura desde localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      if (stored && stored !== "undefined") {
        setUser(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Error leyendo usuario:", error);
      localStorage.removeItem("user");
    }
  }, []);

  // LOGIN
  const login = async (email, password) => {
    const response = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) throw new Error("Credenciales incorrectas");

    const data = await response.json();

    // Guardar usuario para sesión
    localStorage.setItem("user", JSON.stringify(data));
    setUser(data);

    return data;
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  // ROLES
  const isAuthenticated = !!user;
  const isAdmin = user?.role === "ADMIN";

  return (
    <AuthContext.Provider
      value={{
        user,
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

const API_URL = "http://localhost:8080/api/auth";

/** Login con JWT (nuevo endpoint del backend) */
export const loginWithJwt = async (email, password) => {
  const response = await fetch(`${API_URL}/login-jwt`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Credenciales incorrectas");
  }

  const data = await response.json();
  return data; // { token: "...", user: {...} }
};

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginAdmin() {

  const { login } = useAuth();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        setError("Credenciales incorrectas");
        return;
      }

      const user = await response.json();

      if (user.role !== "ADMIN") {
        setError("No tienes permisos de administrador");
        return;
      }

      login(user); // GUARDA EL ADMIN EN CONTEXTO
      navigate("/home-admin");

    } catch (err) {
      setError("Error de conexión con el servidor");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "90vh",
        backgroundColor: "var(--black-bg)",
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="p-4 shadow-lg"
        style={{
          width: "380px",
          backgroundColor: "var(--dark-bg)",
          border: "2px solid var(--blue-electric)",
          borderRadius: "12px",
          color: "var(--text-light)",
          boxShadow: "0 0 20px #00bfff55",
        }}
      >
        <h2
          className="text-center mb-4"
          style={{ color: "var(--blue-electric)", fontWeight: "bold" }}
        >
          Admin Login
        </h2>

        {error && <p className="error">{error}</p>}

        <div className="mb-3">
          <label>Correo Admin</label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            className="form-control"
            style={{ backgroundColor: "#000", color: "#fff" }}
          />
        </div>

        <div className="mb-3">
          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            className="form-control"
            style={{ backgroundColor: "#000", color: "#fff" }}
          />
        </div>

        <button
          type="submit"
          className="btn btn-electric w-100 mt-3"
          style={{ padding: "10px", fontWeight: "bold" }}
        >
          Ingresar como Admin
        </button>
      </form>
    </div>
  );
}

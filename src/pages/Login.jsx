import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login } = useAuth();

  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!values.email.trim() || !values.password.trim()) {
      setErrors({ email: "Credenciales inválidas" });
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error();

      const data = await response.json();
      login(data); // guardar en EL CONTEXTO

      window.location.href = "/"; // redirigir a home

    } catch (err) {
      setErrors({
        email: "Email o contraseña incorrectos",
        password: " ",
      });
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "90vh", backgroundColor: "var(--black-bg)" }}
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
        }}
      >
        <h2
          className="text-center mb-4"
          style={{ color: "var(--blue-electric)", fontWeight: "bold" }}
        >
          Iniciar Sesión
        </h2>

        <div className="mb-3">
          <label>Correo electrónico</label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            className="form-control"
            style={{ backgroundColor: "#000", color: "#fff" }}
          />
          {errors.email && <p className="error">{errors.email}</p>}
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
          {errors.password && <p className="error">{errors.password}</p>}
        </div>

        <button type="submit" className="btn btn-electric w-100 mt-3">
          Ingresar
        </button>
      </form>
    </div>
  );
};

export default Login;

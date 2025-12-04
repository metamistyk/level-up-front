import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors = {};

    if (!values.username.trim()) {
      newErrors.username = "El nombre es obligatorio";
    }

    if (!values.email.trim()) {
      newErrors.email = "El correo es obligatorio";
    }

    if (!values.password.trim()) {
      newErrors.password = "La contraseña es obligatoria";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Error en el registro");
      }

      alert("Usuario registrado exitosamente");

      // Redirigir a login
      navigate("/login");
    } catch (error) {
      alert("No se pudo registrar el usuario");
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
          Crear Cuenta
        </h2>

        {/* NOMBRE */}
        <div className="mb-3">
          <label>Nombre</label>
          <input
            type="text"
            name="username"
            value={values.username}
            onChange={handleChange}
            className="form-control"
            style={{ backgroundColor: "#000", color: "#fff" }}
          />
          {errors.username && <p className="error">{errors.username}</p>}
        </div>

        {/* EMAIL */}
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

        {/* PASSWORD */}
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

        {/* BOTÓN */}
        <button type="submit" className="btn btn-electric w-100 mt-3">
          Registrarse
        </button>
      </form>
    </div>
  );
}

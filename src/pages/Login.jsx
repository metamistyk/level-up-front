import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = values;

    try {
      const loggedUser = await login(email, password);

      // login devuelve user → verificar si existe ID
      if (!loggedUser || !loggedUser.id) {
        alert("Error: el backend no está enviando ID del usuario.");
        return;
      }

      navigate("/");
    } catch (error) {
      alert("Credenciales incorrectas");
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

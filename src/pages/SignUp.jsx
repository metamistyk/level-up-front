import React, { useState } from 'react';

export default function SignUp() {

  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const onChange = (e) => {
    setValues(v => ({ ...v, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    const errs = {};

    if (!values.name.trim()) errs.name = "El nombre es obligatorio";
    if (!values.email.trim()) errs.email = "El correo es obligatorio";

    if (!values.password.trim()) {
      errs.password = "La contraseña es obligatoria";
    } else if (values.password.length < 4) {
      errs.password = "Debe tener al menos 4 caracteres";
    }

    if (values.confirmPassword !== values.password) {
      errs.confirmPassword = "Las contraseñas no coinciden";
    }

    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = validate();
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: values.name,
          email: values.email,
          password: values.password
        })
      });

      if (!response.ok) {
        // Leemos el texto que viene del backend (incluye nuestra RuntimeException)
        const text = await response.text();

        if (text.includes("El correo ya está registrado")) {
          setErrors({ email: "El correo ya está registrado" });
        } else {
          setErrors({ email: "No se pudo registrar el usuario" });
        }

        setSuccess(false);
        return;
      }

      const data = await response.json();
      localStorage.setItem("user", JSON.stringify(data));
      setSuccess(true);
      setErrors({});

      setValues({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      });

    } catch (error) {
      setErrors({ email: "Error de conexión con el servidor" });
      setSuccess(false);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "90vh", backgroundColor: "var(--black-bg)" }}
    >
      <div
        className="p-4 shadow-lg"
        style={{
          width: "420px",
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
          Registrarse
        </h2>

        {success && (
          <div className="alert alert-success text-center">
            Registro exitoso. ¡Bienvenido!
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>

          {/* Nombre */}
          <div className="mb-3">
            <label>Nombre</label>
            <input
              type="text"
              name="name"
              value={values.name}
              onChange={onChange}
              className="form-control"
              style={{
                backgroundColor: "#000",
                color: "var(--text-light)",
                border: "1px solid var(--blue-electric)",
              }}
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>

          {/* Email */}
          <div className="mb-3">
            <label>Correo</label>
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={onChange}
              className="form-control"
              style={{
                backgroundColor: "#000",
                color: "var(--text-light)",
                border: "1px solid var(--blue-electric)",
              }}
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>

          {/* Contraseña */}
          <div className="mb-3">
            <label>Contraseña</label>
            <input
              type="password"
              name="password"
              value={values.password}
              onChange={onChange}
              className="form-control"
              style={{
                backgroundColor: "#000",
                color: "var(--text-light)",
                border: "1px solid var(--blue-electric)",
              }}
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>

          {/* Confirmar contraseña */}
          <div className="mb-3">
            <label>Confirmar contraseña</label>
            <input
              type="password"
              name="confirmPassword"
              value={values.confirmPassword}
              onChange={onChange}
              className="form-control"
              style={{
                backgroundColor: "#000",
                color: "var(--text-light)",
                border: "1px solid var(--blue-electric)",
              }}
            />
            {errors.confirmPassword && (
              <p className="error">{errors.confirmPassword}</p>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-electric w-100 mt-3"
            style={{ padding: "10px", fontWeight: "bold" }}
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
}

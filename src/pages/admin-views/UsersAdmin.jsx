import React, { useState, useEffect } from "react";

export default function UsersAdmin() {
  const [usuarios, setUsuarios] = useState([]);
  const [form, setForm] = useState({ id: null, username: "", email: "" });
  const [editing, setEditing] = useState(false);

  const cargarUsuarios = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/users");
      const data = await response.json();
      setUsuarios(data);
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = editing ? "PUT" : "POST";
    const url = editing
      ? `http://localhost:8080/api/users/${form.id}`
      : "http://localhost:8080/api/users";

    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!response.ok) {
      alert("Error al guardar usuario");
      return;
    }

    cargarUsuarios();
    setForm({ id: null, username: "", email: "" });
    setEditing(false);
  };

  const handleEdit = (usuario) => {
    setForm(usuario);
    setEditing(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("¿Eliminar usuario?");
    if (!confirmDelete) return;

    await fetch(`http://localhost:8080/api/users/${id}`, {
      method: "DELETE",
    });

    cargarUsuarios();
  };

  return (
    <div className="container mt-5">
      <h2>Administrar Usuarios</h2>

      <form className="card p-4 shadow mb-4" onSubmit={handleSubmit}>
        <h4>{editing ? "Editar Usuario" : "Nuevo Usuario"}</h4>

        <input
          type="text"
          name="username"
          className="form-control my-2"
          placeholder="Nombre"
          value={form.username}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          className="form-control my-2"
          placeholder="Correo"
          value={form.email}
          onChange={handleChange}
          required
        />

        <button type="submit" className="btn btn-primary mt-2">
          {editing ? "Actualizar" : "Crear"}
        </button>
      </form>

      <table className="table table-bordered shadow">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {usuarios.length > 0 ? (
            usuarios.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.username}</td>
                <td>{u.email}</td>

                <td>
                  <button className="btn btn-warning me-2" onClick={() => handleEdit(u)}>
                    Editar
                  </button>

                  <button className="btn btn-danger" onClick={() => handleDelete(u.id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No hay usuarios registrados
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

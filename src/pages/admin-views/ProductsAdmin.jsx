import React, { useState, useEffect } from "react";

export default function ProductsAdmin() {
  const [productos, setProductos] = useState([]);
  const [form, setForm] = useState({
    id: null,
    name: "",
    price: "",
    description: "",
    imageUrl: "",
    stock: "",
    destacado: false,
  });
  const [editing, setEditing] = useState(false);

  // Cargar productos
  const cargarProductos = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/products");
      const data = await response.json();
      setProductos(data);
    } catch (error) {
      console.error("Error cargando productos:", error);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  // Manejo de inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Si el admin pega "/assets/imagen.png", dejamos solo "imagen.png"
    let finalValue = value;
    if (name === "imageUrl") {
      finalValue = value.replace("/assets/", "");
    }

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : finalValue,
    });
  };

  // Crear / editar producto
  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = editing ? "PUT" : "POST";
    const url = editing
      ? `http://localhost:8080/api/products/${form.id}`
      : "http://localhost:8080/api/products";

    const bodyData = { ...form };

    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bodyData),
    });

    if (!response.ok) {
      alert("Error al guardar producto");
      return;
    }

    cargarProductos();
    setForm({
      id: null,
      name: "",
      price: "",
      description: "",
      imageUrl: "",
      stock: "",
      destacado: false,
    });
    setEditing(false);
  };

  // Cargar datos del producto en el formulario para editar
  const handleEdit = (producto) => {
    setForm(producto);
    setEditing(true);
  };

  // Eliminar producto
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("¿Seguro que deseas eliminar este producto?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:8080/api/products/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        alert("Error al eliminar producto");
        return;
      }

      cargarProductos();
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
  };

  return (
    <div className="container mt-5 text-light">
      <h2 className="mb-4">Administrar Productos</h2>

      {/* FORMULARIO */}
      <form className="card p-4 shadow mb-4 bg-dark" onSubmit={handleSubmit}>
        <h4 className="mb-3">{editing ? "Editar Producto" : "Nuevo Producto"}</h4>

        <input
          type="text"
          name="name"
          placeholder="Nombre"
          className="form-control my-2"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Precio"
          className="form-control my-2"
          value={form.price}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Descripción"
          className="form-control my-2"
          value={form.description}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="imageUrl"
          placeholder="Nombre imagen (ej: ps5.png)"
          className="form-control my-2"
          value={form.imageUrl}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="stock"
          placeholder="Stock"
          className="form-control my-2"
          value={form.stock}
          onChange={handleChange}
          required
        />

        {/* CHECK DESTACADO */}
        <label className="mt-2">
          <input
            type="checkbox"
            name="destacado"
            checked={form.destacado}
            onChange={handleChange}
          />{" "}
          Producto destacado
        </label>

        <button type="submit" className="btn btn-primary mt-3">
          {editing ? "Actualizar" : "Crear"}
        </button>
      </form>

      {/* TABLA */}
      <table className="table table-dark table-striped shadow">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Imagen</th>
            <th>Stock</th>
            <th>Destacado</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {productos.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>

              {/* PRECIO FORMATEADO */}
              <td>${p.price.toLocaleString("es-CL")}</td>

              <td>
                <img
                  src={`/assets/${p.imageUrl}`}
                  alt={p.name}
                  width="60"
                  height="60"
                  className="rounded"
                  style={{ objectFit: "cover" }}
                  onError={(e) => {
                    e.target.src = "/assets/logo.png";
                  }}
                />
              </td>

              <td>{p.stock}</td>
              <td>{p.destacado ? "Sí" : "No"}</td>

              <td>
                <button className="btn btn-warning me-2" onClick={() => handleEdit(p)}>
                  Editar
                </button>
                <button className="btn btn-danger" onClick={() => handleDelete(p.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}

          {productos.length === 0 && (
            <tr>
              <td colSpan="7" className="text-center">
                No hay productos registrados
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

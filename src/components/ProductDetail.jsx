import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { authFetch } from "../utils/authFetch";

export default function ProductDetail() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);

  let user = null;
  try {
    const storedUser = localStorage.getItem("user");
    if (storedUser && storedUser !== "undefined") {
      user = JSON.parse(storedUser);
    }
  } catch {
    user = null;
  }

  const cargarProducto = async () => {
    const response = await fetch(
      `http://localhost:8080/api/products/${id}`
    );
    const data = await response.json();
    setProducto(data);
  };

  const agregarAlCarrito = async () => {
    if (!user) {
      alert("Debes iniciar sesión.");
      return;
    }

    await authFetch(
      `http://localhost:8080/api/cart/add?userId=${user.id}&productId=${id}&quantity=1`,
      { method: "POST" }
    );

    alert("Producto agregado al carrito");
  };

  useEffect(() => {
    cargarProducto();
  }, []);

  if (!producto) return <p className="text-light">Cargando...</p>;

  return (
    <div className="container text-light mt-4">
      <h2>{producto.name}</h2>
      <img
        src={`/assets/${producto.imageUrl}`}
        alt={producto.name}
        style={{ width: "200px" }}
      />
      <p>{producto.description}</p>
      <p>${producto.price}</p>

      <button className="btn btn-primary" onClick={agregarAlCarrito}>
        Agregar al carrito
      </button>
    </div>
  );
}

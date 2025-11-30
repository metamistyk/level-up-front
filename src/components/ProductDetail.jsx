import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import QuantitySelector from './QuantitySelector';
import PurchaseAlert from './PurchaseAlert';

export default function ProductDetail() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  // Obtener producto desde backend
  const cargarProducto = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/products/${id}`);
      const data = await response.json();
      setProducto(data);
    } catch (error) {
      console.error("Error al cargar el producto:", error);
    }
  };

  useEffect(() => {
    cargarProducto();
  }, [id]);

  if (!producto) {
    return <p className="text-center mt-5">Cargando producto...</p>;
  }

  const handleAddToCart = async (cantidad) => {
    if (!user) {
      setAlertMessage("Debes iniciar sesión para agregar productos.");
      setShowAlert(true);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/cart/add?userId=${user.id}&productId=${producto.id}&quantity=${cantidad}`,
        { method: "POST" }
      );

      if (!response.ok) throw new Error("Error al agregar al carrito");

      setAlertMessage("Producto agregado al carrito");
      setShowAlert(true);

    } catch (error) {
      setAlertMessage("Hubo un error al agregar al carrito");
      setShowAlert(true);
    }
  };

  return (
    <div className="container my-4">

      <div
        className="card shadow-lg p-4"
        style={{
          backgroundColor: "var(--dark-bg)",
          border: "2px solid var(--blue-electric)",
          color: "var(--text-light)"
        }}
      >

        <div className="row g-4 align-items-center">

          {/* IMAGEN */}
          <div className="col-md-6 text-center">
            <img
              src={`/assets/${producto.imageUrl}`}
              alt={producto.name}
              className="img-fluid rounded"
              style={{
                maxHeight: "380px",
                objectFit: "contain",
                backgroundColor: "#000",
                border: "2px solid var(--blue-electric)",
                padding: "10px",
                borderRadius: "10px",
                boxShadow: "0 0 12px #00bfff"
              }}
            />
          </div>

          {/* INFO */}
          <div className="col-md-6">
            <h2 style={{ color: "var(--blue-electric)" }}>
              {producto.name}
            </h2>

            {/* PRECIO CON FORMATO CHILENO */}
            <h3 className="fw-bold my-3 text-success">
              ${producto.price.toLocaleString("es-CL")}
            </h3>

            <p className="mb-4">
              {producto.description}
            </p>

            <QuantitySelector onAddToCart={handleAddToCart} />

            <Link
              to="/products"
              className="btn btn-electric mt-3"
            >
              Volver a productos
            </Link>
          </div>

        </div>
      </div>

      <PurchaseAlert
        show={showAlert}
        message={alertMessage}
        onClose={() => setShowAlert(false)}
      />
    </div>
  );
}

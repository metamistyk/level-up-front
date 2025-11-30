import React, { useState, useEffect } from 'react';
import PurchaseAlert from '../components/PurchaseAlert';

export default function Carrito() {
  const [carrito, setCarrito] = useState([]);
  const [cartId, setCartId] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const user = JSON.parse(localStorage.getItem("user"));

  // Obtener carrito desde backend
  const cargarCarrito = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/cart/user/${user.id}`);
      const data = await response.json();

      setCarrito(data.items); // items viene del backend
      setCartId(data.cartId);

    } catch (error) {
      console.error("Error al cargar carrito:", error);
    }
  };

  useEffect(() => {
    cargarCarrito();
  }, []);

  const aumentarCantidad = async (cartItemId) => {
    const item = carrito.find(i => i.id === cartItemId);

    await fetch(
      `http://localhost:8080/api/cart/item/${cartItemId}?quantity=${item.quantity + 1}`,
      { method: "PUT" }
    );
    cargarCarrito();
  };

  const disminuirCantidad = async (cartItemId) => {
    const item = carrito.find(i => i.id === cartItemId);

    if (item.quantity <= 1) return;

    await fetch(
      `http://localhost:8080/api/cart/item/${cartItemId}?quantity=${item.quantity - 1}`,
      { method: "PUT" }
    );
    cargarCarrito();
  };

  const eliminarProducto = async (cartItemId) => {
    await fetch(`http://localhost:8080/api/cart/item/${cartItemId}`, {
      method: "DELETE"
    });
    cargarCarrito();
  };

  const vaciarCarrito = async () => {
    await fetch(`http://localhost:8080/api/cart/clear/${user.id}`, {
      method: "DELETE"
    });
    cargarCarrito();
  };

  const handleComprar = () => {
    if (carrito.length === 0) {
      setAlertMessage("Tu carrito está vacío.");
      setShowAlert(true);
      return;
    }

    setAlertMessage("¡Compra realizada con éxito!");
    setShowAlert(true);
    vaciarCarrito();
  };

  const calcularTotal = () =>
    carrito.reduce((acc, item) => acc + item.subtotal, 0);

  return (
    <div className="container mt-4 text-light">
      <h2 className="text-center mb-4">Tu Carrito</h2>

      {carrito.length === 0 ? (
        <p className="text-center">Tu carrito está vacío.</p>
      ) : (
        <>
          <ul className="list-group mb-3">
            {carrito.map(item => (
              <li
                key={item.id}
                className="list-group-item d-flex justify-content-between align-items-center bg-dark text-light"
              >

                {/* IMAGEN + INFO */}
                <div className="d-flex align-items-center">

                  <img
                    src={`/assets/${item.product.imageUrl}`}
                    alt={item.product.name}
                    width="60"
                    height="60"
                    className="me-3 rounded"
                    style={{ objectFit: "cover" }}
                    onError={(e) => { e.target.src = "/assets/logo.png"; }}
                  />

                  <div>
                    <h5 className="mb-1">{item.product.name}</h5>
                    {/* PRECIO UNITARIO FORMATEADO */}
                    <p className="mb-0">
                      ${item.product.price.toLocaleString("es-CL")}
                    </p>
                  </div>

                </div>

                {/* CANTIDAD */}
                <div className="d-flex align-items-center">
                  <button
                    className="btn btn-outline-secondary me-2"
                    onClick={() => disminuirCantidad(item.id)}
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    className="btn btn-outline-secondary ms-2"
                    onClick={() => aumentarCantidad(item.id)}
                  >
                    +
                  </button>
                </div>

                {/* SUBTOTAL + ELIMINAR */}
                <div className="d-flex align-items-center">
                  {/* SUBTOTAL FORMATEADO */}
                  <span className="me-3">
                    ${item.subtotal.toLocaleString("es-CL")}
                  </span>
                  <button
                    className="btn btn-danger"
                    onClick={() => eliminarProducto(item.id)}
                  >
                    Eliminar
                  </button>
                </div>

              </li>
            ))}
          </ul>

          {/* TOTAL */}
          <div className="text-end mb-3">
            <h4>
              Total: ${calcularTotal().toLocaleString("es-CL")}
            </h4>
          </div>

          {/* BOTONES */}
          <div className="text-end">
            <button className="btn btn-warning me-3" onClick={vaciarCarrito}>
              Vaciar Carrito
            </button>
            <button className="btn btn-success btn-lg" onClick={handleComprar}>
              Comprar
            </button>
          </div>
        </>
      )}

      <PurchaseAlert
        show={showAlert}
        message={alertMessage}
        onClose={() => setShowAlert(false)}
      />
    </div>
  );
}

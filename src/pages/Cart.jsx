import { useEffect, useState } from "react";
import { authFetch } from "../utils/authFetch";

export default function Cart() {
  const [carrito, setCarrito] = useState([]);
  const [cartId, setCartId] = useState(null);

  let user = null;
  try {
    const storedUser = localStorage.getItem("user");
    if (storedUser && storedUser !== "undefined") {
      user = JSON.parse(storedUser);
    }
  } catch {
    user = null;
  }

  const cargarCarrito = async () => {
    if (!user) return;

    const response = await authFetch(
      `http://localhost:8080/api/cart/user/${user.id}`
    );
    const data = await response.json();
    setCarrito(data.items || []);
    setCartId(data.cartId);
  };

  const aumentarCantidad = async (cartItemId) => {
    await authFetch(
      `http://localhost:8080/api/cart/item/${cartItemId}?quantity=1`,
      { method: "PUT" }
    );
    cargarCarrito();
  };

  const disminuirCantidad = async (cartItemId) => {
    await authFetch(
      `http://localhost:8080/api/cart/item/${cartItemId}?quantity=-1`,
      { method: "PUT" }
    );
    cargarCarrito();
  };

  const eliminarItem = async (cartItemId) => {
    await authFetch(`http://localhost:8080/api/cart/item/${cartItemId}`, {
      method: "DELETE",
    });
    cargarCarrito();
  };

  const vaciarCarrito = async () => {
    await authFetch(`http://localhost:8080/api/cart/clear/${user.id}`, {
      method: "DELETE",
    });
    cargarCarrito();
  };

  useEffect(() => {
    cargarCarrito();
  }, []);

  if (!user) {
    return (
      <div className="container mt-5 text-light">
        <h2>Carrito</h2>
        <p>Debes iniciar sesión para ver tu carrito.</p>
      </div>
    );
  }

  return (
    <div className="container text-light mt-4">
      <h2>Carrito</h2>

      {carrito.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <>
          {carrito.map((item) => (
            <div key={item.id} className="card bg-dark text-light mb-2 p-3">
              <div className="d-flex justify-content-between">
                <div>
                  <h5>{item.productName}</h5>
                  <p>${item.price}</p>
                </div>

                <div className="d-flex align-items-center">
                  <button
                    className="btn btn-secondary me-2"
                    onClick={() => disminuirCantidad(item.id)}
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    className="btn btn-secondary ms-2"
                    onClick={() => aumentarCantidad(item.id)}
                  >
                    +
                  </button>

                  <button
                    className="btn btn-danger ms-3"
                    onClick={() => eliminarItem(item.id)}
                  >
                    X
                  </button>
                </div>
              </div>
            </div>
          ))}

          <button className="btn btn-warning mt-3" onClick={vaciarCarrito}>
            Vaciar Carrito
          </button>
        </>
      )}
    </div>
  );
}

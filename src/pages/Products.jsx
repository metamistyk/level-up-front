import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import QuantitySelector from '../components/QuantitySelector';

export default function Products({ searchQuery }) {
  const [productos, setProductos] = useState([]);

  // Manejo SEGURO del usuario
  let user = null;
  try {
    const storedUser = localStorage.getItem("user");
    if (storedUser && storedUser !== "undefined") {
      user = JSON.parse(storedUser);
    }
  } catch {
    user = null;
  }

  const query = (searchQuery || "").toLowerCase();

  // Obtener productos desde backend
  const cargarProductos = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/products");
      const data = await response.json();
      setProductos(data);
    } catch (error) {
      console.error("Error al cargar productos:", error);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  // Agregar al carrito
  const handleAddFromProducts = async (producto, cantidad) => {
    if (!user) {
      alert("Debes iniciar sesión para agregar productos.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/cart/add?userId=${user.id}&productId=${producto.id}&quantity=${cantidad}`,
        { method: "POST" }
      );

      if (!response.ok) throw new Error();

      alert(`Agregaste ${cantidad} unidad(es) de ${producto.name}.`);
    } catch (error) {
      alert("Error al agregar al carrito");
    }
  };

  // Filtrar por búsqueda
  const productosFiltrados = productos.filter(producto => {
    const name = producto.name?.toLowerCase() || "";
    const category = producto.category?.toLowerCase() || "";
    return name.includes(query) || category.includes(query);
  });

  return (
    <section className="container my-4">
      <h2 className="text-center mb-4 titulos">Productos</h2>

      <div className="row">
        {productosFiltrados.length > 0 ? (
          productosFiltrados.map(producto => (
            <div key={producto.id} className="col-md-4 mb-4">

              <div className="card h-100 product-card">

                {/* SOLO LA IMAGEN ABRE EL DETALLE */}
                <Link to={`/products/${producto.id}`}>
                  <img
                    src={`/assets/${producto.imageUrl}`}
                    alt={producto.name}
                    className="card-img-top"
                    style={{
                      objectFit: "contain",
                      height: "200px",
                      backgroundColor: "#000"
                    }}
                    loading="lazy"
                  />
                </Link>

                <div className="card-body custom-card-body">

                  {/* SOLO EL TÍTULO ES CLICKEABLE */}
                  <Link
                    to={`/products/${producto.id}`}
                    className="text-light"
                    style={{ textDecoration: "none" }}
                  >
                    <h5 className="card-title">{producto.name}</h5>
                  </Link>

                  <p className="card-text fw-bold">
                    ${producto.price.toLocaleString("es-CL")}
                  </p>

                  {/* AGREGAR AL CARRITO */}
                  <QuantitySelector
                    onAddToCart={(cantidad) =>
                      handleAddFromProducts(producto, cantidad)
                    }
                  />
                </div>

              </div>
            </div>
          ))
        ) : (
          <p className="text-center">
            No se encontraron productos que coincidan con tu búsqueda.
          </p>
        )}
      </div>
    </section>
  );
}

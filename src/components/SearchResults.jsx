import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function SearchResults({ searchQuery }) {
  const [productos, setProductos] = useState([]);

  // Obtener productos desde backend
  useEffect(() => {
    fetch("http://localhost:8080/api/products")
      .then(res => res.json())
      .then(data => setProductos(data))
      .catch(err => console.error("Error al cargar productos:", err));
  }, []);

  const filteredResults = productos.filter(producto =>
    producto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    producto.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="container my-4">
      <h2 className="text-center mb-4 titulos">Resultados de búsqueda</h2>

      <div className="row">
        {filteredResults.length > 0 ? (
          filteredResults.map(producto => (
            <div key={producto.id} className="col-md-4 mb-4">
              <Link to={`/products/${producto.id}`} style={{ textDecoration: 'none' }}>
                <div className="card product-card shadow-sm h-100">
                  <img
                    src={`/assets/${producto.imageUrl}`}
                    alt={producto.name}
                    className="h-32 w-full object-cover rounded"
                    loading="lazy"
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{producto.name}</h5>
                    <p className="card-text fw-bold">
                      ${producto.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              </Link>
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

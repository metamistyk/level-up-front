import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const [destacados, setDestacados] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const cargarDestacados = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/products/destacados"
        );
        const data = await response.json();
        setDestacados(data);
      } catch (error) {
        console.error("Error cargando destacados:", error);
      }
    };

    cargarDestacados();
  }, []);

  return (
    <div
      className="hero-section d-flex align-items-center justify-content-center"
      style={{
        backgroundImage: `url("/assets/fondo.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "85vh",
        position: "relative",
      }}
    >
      {/* OVERLAY OSCURO GAMER */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.85))",
          zIndex: 1,
        }}
      ></div>

      {/* CONTENIDO */}
      <div className="container text-center" style={{ zIndex: 2 }}>
        <h1 className="text-light mb-4 fw-bold display-4">
          <span style={{ color: "#00bfff" }}>LEVEL-UP GAMER</span>
        </h1>

        <h3 className="text-info mb-5">Productos Destacados</h3>

        <div className="row justify-content-center">

          {destacados.map((p) => (
            <div key={p.id} className="col-md-4 mb-4">

              {/* CARD TRANSPARENTE */}
              <div
                className="card text-light shadow-lg border border-info"
                style={{
                  borderRadius: "12px",
                  background: "rgba(0, 0, 0, 0.35)", //TRANSPARENCIA
                  backdropFilter: "blur(4px)",       //EFECTO VIDRIO ELEGANTE
                  WebkitBackdropFilter: "blur(4px)",
                }}
              >
                {/* IMG */}
                <img
                  src={`/assets/${p.imageUrl}`}
                  alt={p.name}
                  className="card-img-top"
                  style={{
                    height: "220px",
                    objectFit: "contain",
                    padding: "10px",
                  }}
                  onError={(e) => (e.target.src = "/assets/logo.png")}
                />

                {/* INFO */}
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>

                  <p className="card-text text-info fw-bold">
                    ${p.price.toLocaleString("es-CL")}
                  </p>

                  {/* BOTÓN VER DETALLE */}
                  <button
                    className="btn btn-outline-info w-100"
                    onClick={() => navigate(`/products/${p.id}`)}
                  >
                    Ver Detalle
                  </button>
                </div>
              </div>

            </div>
          ))}

          {destacados.length === 0 && (
            <p className="text-light">No hay productos destacados.</p>
          )}

        </div>
      </div>
    </div>
  );
}

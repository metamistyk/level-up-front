import React from 'react';
import { NavLink, Link } from 'react-router-dom';

export default function Navbar({ searchQuery, onSearch }) {

  const handleChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark"
      style={{
        backgroundColor: "var(--dark-bg)",
        borderBottom: "2px solid var(--blue-electric)",
        boxShadow: "0 0 12px rgba(0, 168, 255, 0.4)"
      }}
    >
      <div className="container-fluid">

        {/* LOGO */}
        <Link className="navbar-brand d-flex align-items-center text-light" to="/">
          <img
            src="/assets/logo.png"
            alt="Logo"
            width="55"
            height="55"
            className="me-2"
            style={{
              filter: "drop-shadow(0 0 6px #00bfff)",
              borderRadius: "8px"
            }}
          />
          
        </Link>

        {/* BOTÓN RESPONSIVE */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          style={{ border: "1px solid var(--blue-electric)" }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* CONTENIDO */}
        <div className="collapse navbar-collapse" id="navbarNav">

          {/* LINKS IZQUIERDA */}
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink to="/" className="nav-link navlink-gamer">Inicio</NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/products" className="nav-link navlink-gamer">Productos</NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/about" className="nav-link navlink-gamer">Nosotros</NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/contact" className="nav-link navlink-gamer">Contacto</NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/blogs" className="nav-link navlink-gamer">Blog</NavLink>
            </li>
          </ul>

          {/* BUSCADOR */}
          <form className="d-flex me-3">
            <input
              className="form-control"
              placeholder="Buscar..."
              value={searchQuery}
              onChange={handleChange}
              style={{
                backgroundColor: "#000",
                color: "var(--text-light)",
                border: "1px solid var(--blue-electric)",
                boxShadow: "0 0 8px rgba(0,168,255,0.3)"
              }}
            />
          </form>

          {/* ICONOS DERECHA */}
          <ul className="navbar-nav d-flex align-items-center">

            {/* CARRITO */}
            <li className="nav-item me-2">
              <NavLink to="/cart" className="btn btn-electric">
                🛒
              </NavLink>
            </li>

            {/* LOGIN */}
            <li className="nav-item me-2">
              <NavLink to="/login" className="btn btn-electric">
                Login
              </NavLink>
            </li>

            {/* REGISTRO */}
            <li className="nav-item">
              <NavLink to="/signUp" className="btn btn-electric">
                Registrarse
              </NavLink>
            </li>

          </ul>

        </div>
      </div>

      {/* ESTILO INTERNO NAVLINKS */}
      <style>{`
        .navlink-gamer {
          color: var(--text-light) !important;
          font-weight: 500;
          margin-right: 10px;
          transition: 0.2s ease-in-out;
        }

        .navlink-gamer:hover {
          color: var(--blue-electric) !important;
          text-shadow: 0 0 6px #00bfff;
        }

        .navlink-gamer.active {
          color: var(--blue-electric) !important;
          font-weight: bold;
          text-shadow: 0 0 8px #00bfff;
        }

        .btn-electric {
          background-color: var(--blue-electric);
          border: 1px solid var(--blue-electric);
          color: #000;
          font-weight: bold;
          transition: 0.2s ease-in-out;
          box-shadow: 0 0 8px rgba(0,168,255,0.5);
        }

        .btn-electric:hover {
          background-color: #0090d1;
          border-color: #0090d1;
          color: #fff;
          box-shadow: 0 0 12px rgba(0,168,255,0.8);
        }
      `}</style>
    </nav>
  );
}

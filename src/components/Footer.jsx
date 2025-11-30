import React from 'react';
import { NavLink } from 'react-router-dom';
import '../utils/Footer.logic.js'; 

const Footer = () => {
  const date = new Date();
  const fecha = window.FooterLogic.getFormattedDate(date);

  return (
    <footer className="footer-container">
      <div className="container">
        <div className="row align-items-start">

          {/* Logo y derechos */}
          <div className="col-md-6 d-flex flex-column align-items-center align-items-md-start">
            <img
              src="/assets/logo.png"
              alt="Logo"
              className="d-block mb-2"
              style={{ width: '100px' }}
            />
            <p className="mb-0">© {fecha} Level-Up. Todos los derechos reservados.</p>
          </div>

          {/* Navegación */}
          <div className="col-md-6 d-flex justify-content-md-end align-items-center gap-3 mt-3 mt-md-0">

            <NavLink
              to="/blogs"
              className={({ isActive }) =>
                "nav-link btn-electric" + (isActive ? " active" : "")
              }
            >
              Blogs
            </NavLink>

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                "nav-link btn-electric" + (isActive ? " active" : "")
              }
            >
              Contacto
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                "nav-link btn-electric" + (isActive ? " active" : "")
              }
            >
              Nosotros
            </NavLink>

            <NavLink
              to="/login-admin"
              className={({ isActive }) =>
                "nav-link btn-electric" + (isActive ? " active" : "")
              }
            >
              Login Admin
            </NavLink>

          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React from 'react';
import { NavLink } from 'react-router-dom';

export default function AdminHome() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center min-vh-100 fondo-completo">
      <h2 className="titulos mb-4"><b>Panel de Administración</b></h2>

      <div className="d-flex gap-5">
        <NavLink to="/product-admin" className="btn btn-outline-primary btn-lg titulos">
          Gestionar Productos
        </NavLink>

        <NavLink to="/user-admin" className="btn btn-outline-secondary btn-lg titulos">
          Gestionar Usuarios
        </NavLink>
      </div>
    </div>
  );
}

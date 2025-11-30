import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Blogs() {
  return (
    <div className='fondo-completo "collapse navbar-collapse"'>
      <h1 className='titulos'>
        <b>Level-Up Gamer | Blogs</b>
      </h1>

      {/* Blog 1 */}
      <div className='titulos'>
        <NavLink
          to='/blog1'
          className={({ isActive }) =>
            "nav-link btn-electric me-2" + (isActive ? " active" : "")
          }
        >
          La evolución de las consolas. <br />
          <img
            src="/assets/evo_cons.jpeg"
            alt="consolas"
            style={{ maxWidth: "300px", borderRadius: "10px" }}
          />
        </NavLink>
      </div>

      {/* Blog 2 */}
      <div className='titulos'>
        <NavLink
          to='/blog2'
          className={({ isActive }) =>
            "nav-link btn-electric me-2" + (isActive ? " active" : "")
          }
        >
          Arma tu primer setup gamer <br />
          <img
            src="/assets/setupg.webp"
            alt="setup gamer"
            style={{ maxWidth: "300px", borderRadius: "10px" }}
          />
        </NavLink>
      </div>
    </div>
  );
}

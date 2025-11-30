import React, { useState } from 'react';
import ContactLogic from '../utils/Contact.logic.js';

export default function Contact() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  return (
    <section
      className="container my-5 fondo-completo"
      style={{ maxWidth: '700px', padding: '0' }}
    >
      <h1 className="titulos text-center mb-4">Contacto</h1>

      <form
        onSubmit={(e) =>
          ContactLogic.handleSubmit(e, values, setErrors, setSent, setValues)
        }
        noValidate
      >
        {/* Campo nombre */}
        <div className="mb-3">
          <label className="form-label titulos">Nombre</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={values.name}
            onChange={(e) =>
              ContactLogic.handleChange(e, values, errors, setValues, setErrors, setSent)
            }
          />
          {errors.name && <div className="text-danger">{errors.name}</div>}
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="form-label titulos">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={values.email}
            onChange={(e) =>
              ContactLogic.handleChange(e, values, errors, setValues, setErrors, setSent)
            }
          />
          {errors.email && <div className="text-danger">{errors.email}</div>}
        </div>

        {/* Teléfono */}
        <div className="mb-3">
          <label className="form-label titulos">Teléfono</label>
          <input
            type="tel"
            className="form-control"
            name="phone"
            value={values.phone}
            onChange={(e) =>
              ContactLogic.handleChange(e, values, errors, setValues, setErrors, setSent)
            }
          />
          {errors.phone && <div className="text-danger">{errors.phone}</div>}
        </div>

        {/* Mensaje */}
        <div className="mb-3">
          <label className="form-label titulos">Mensaje</label>
          <textarea
            className="form-control"
            rows="5"
            name="message"
            value={values.message}
            onChange={(e) =>
              ContactLogic.handleChange(e, values, errors, setValues, setErrors, setSent)
            }
          ></textarea>
          {errors.message && <div className="text-danger">{errors.message}</div>}
        </div>

        {/* Botón */}
        <button className="btn btn-primary w-100" type="submit">
          Enviar
        </button>

        {/* Mensaje éxito */}
        {sent && (
          <div className="text-success mt-3 text-center">
            ¡Formulario enviado correctamente!
          </div>
        )}
      </form>
    </section>
  );
}

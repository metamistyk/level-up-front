// Contact.logic.js
// Lógica separada del formulario de contacto, cumpliendo pauta E3.

const ContactLogic = {
  // Manejar cambios en los campos del formulario
  handleChange(e, values, errors, setValues, setErrors, setSent) {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });

    // Resetea mensaje enviado al modificar campos
    setSent(false);

    // Validar el campo modificado
    const newErrors = { ...errors };

    if (name === "name") {
      if (!value.trim()) newErrors.name = "El nombre es obligatorio.";
      else delete newErrors.name;
    }

    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value.trim()) newErrors.email = "El email es obligatorio.";
      else if (!emailRegex.test(value))
        newErrors.email = "Debe ingresar un email válido.";
      else delete newErrors.email;
    }

    if (name === "phone") {
      const phoneRegex = /^[0-9]{8,15}$/; // flexible pero controlado
      if (!value.trim()) newErrors.phone = "El teléfono es obligatorio.";
      else if (!phoneRegex.test(value))
        newErrors.phone = "Debe ser un teléfono válido (solo números).";
      else delete newErrors.phone;
    }

    if (name === "message") {
      if (!value.trim())
        newErrors.message = "El mensaje no puede estar vacío.";
      else delete newErrors.message;
    }

    setErrors(newErrors);
  },

  // Manejar envío del formulario
  handleSubmit(e, values, setErrors, setSent, setValues) {
    e.preventDefault();

    const newErrors = {};

    // Validaciones completas
    if (!values.name.trim()) newErrors.name = "El nombre es obligatorio.";
    if (!values.email.trim()) newErrors.email = "El email es obligatorio.";
    else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(values.email))
        newErrors.email = "Debe ingresar un email válido.";
    }

    if (!values.phone.trim()) newErrors.phone = "El teléfono es obligatorio.";
    else {
      const phoneRegex = /^[0-9]{8,15}$/;
      if (!phoneRegex.test(values.phone))
        newErrors.phone = "Debe ser un teléfono válido (solo números).";
    }

    if (!values.message.trim())
      newErrors.message = "El mensaje no puede estar vacío.";

    // Si hay errores, no enviar
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Envío exitoso simulado (no requiere backend)
    setSent(true);

    // Reiniciar formulario
    setValues({
      name: "",
      email: "",
      phone: "",
      message: "",
    });

    setErrors({});
  },
};

export default ContactLogic;

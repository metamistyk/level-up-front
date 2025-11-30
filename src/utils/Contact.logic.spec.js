import ContactLogic from "./Contact.logic.js";

describe("ContactLogic", () => {
  let values;
  let errors;
  let setValues;
  let setErrors;
  let setSent;

  beforeEach(() => {
    values = {
      name: "",
      email: "",
      phone: "",
      message: ""
    };

    errors = {};

    setValues = jest.fn();
    setErrors = jest.fn();
    setSent = jest.fn();
  });

  // --- Test handleChange ---
  test("handleChange actualiza el campo correcto", () => {
    const event = { target: { name: "name", value: "Leo" } };

    ContactLogic.handleChange(event, values, errors, setValues, setErrors, setSent);

    expect(setValues).toHaveBeenCalledWith({
      ...values,
      name: "Leo"
    });
  });

  test("handleChange valida email incorrecto", () => {
    const event = { target: { name: "email", value: "correo-mal" } };

    ContactLogic.handleChange(event, values, errors, setValues, setErrors, setSent);

    expect(setErrors).toHaveBeenCalled();
  });

  // --- Test handleSubmit ---
  test("handleSubmit marca errores si falta información", () => {
    ContactLogic.handleSubmit(
      { preventDefault: () => {} },
      values,
      setErrors,
      setSent,
      setValues
    );

    // Debe llamar a setErrors con al menos 1 error
    expect(setErrors).toHaveBeenCalled();
    expect(setSent).not.toHaveBeenCalled();
  });

  test("handleSubmit envía correctamente si los datos son válidos", () => {
    values = {
      name: "Leonardo",
      email: "leo@test.com",
      phone: "912345678",
      message: "Hola soy Leo"
    };

    ContactLogic.handleSubmit(
      { preventDefault: () => {} },
      values,
      setErrors,
      setSent,
      setValues
    );

    // Simulación de envío exitoso
    expect(setSent).toHaveBeenCalledWith(true);
    expect(setValues).toHaveBeenCalledWith({
      name: "",
      email: "",
      phone: "",
      message: ""
    });
  });
});

// ---------------------------------------------------------
// Navbar.logic.spec.js
// Pruebas unitarias Jasmine para NavbarLogic
// Usa las funciones directamente desde window.NavbarLogic
// ---------------------------------------------------------

describe("NavbarLogic.handleChange", function () {

  it("Debe retornar el nuevo valor y llamar a onSearch (caso válido)", function () {
    var calledValue = null;
    function fakeOnSearch(v) { calledValue = v; }

    var event = { target: { value: "zapatillas" } };

    var result = window.NavbarLogic.handleChange("", event, fakeOnSearch);

    expect(result).toBe("zapatillas");
    expect(calledValue).toBe("zapatillas");
  });


  it("Debe retornar null si el evento es inválido", function () {
    var result = window.NavbarLogic.handleChange("", null, function () {});
    expect(result).toBeNull();
  });


  it("Debe retornar el valor pero NO fallar si onSearch no es función (caso borde)", function () {
    var event = { target: { value: "mouse gamer" } };

    var result = window.NavbarLogic.handleChange("", event, null);

    expect(result).toBe("mouse gamer");
  });

});

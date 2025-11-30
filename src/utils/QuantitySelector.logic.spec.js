// ---------------------------------------------------------
// QuantitySelector.logic.spec.js
// Tests Jasmine para QuantitySelectorLogic
// ---------------------------------------------------------


describe("QuantitySelectorLogic.aumentarCantidad", function () {

  it("Debe aumentar en 1 (caso válido)", function () {
    var result = window.QuantitySelectorLogic.aumentarCantidad(3);
    expect(result).toBe(4);
  });

  it("Debe devolver 1 si el valor es inválido", function () {
    var result = window.QuantitySelectorLogic.aumentarCantidad("x");
    expect(result).toBe(1);
  });

  it("Debe funcionar con valores borde como 0", function () {
    var result = window.QuantitySelectorLogic.aumentarCantidad(0);
    expect(result).toBe(1);
  });

});


// ---------------------------------------------------------
// disminuirCantidad
// ---------------------------------------------------------
describe("QuantitySelectorLogic.disminuirCantidad", function () {

  it("Debe disminuir en 1 (caso válido)", function () {
    var result = window.QuantitySelectorLogic.disminuirCantidad(5);
    expect(result).toBe(4);
  });

  it("Debe retornar 1 si el nuevo valor sería menor que 1", function () {
    var result = window.QuantitySelectorLogic.disminuirCantidad(1);
    expect(result).toBe(1);
  });

  it("Debe retornar 1 si el valor es inválido", function () {
    var result = window.QuantitySelectorLogic.disminuirCantidad(null);
    expect(result).toBe(1);
  });

});


// ---------------------------------------------------------
// handleAgregar
// ---------------------------------------------------------
describe("QuantitySelectorLogic.handleAgregar", function () {

  it("Debe llamar a onAddToCart con la cantidad", function () {
    var received = null;
    function fakeAdd(c) { received = c; }

    var result = window.QuantitySelectorLogic.handleAgregar(fakeAdd, 4);

    expect(received).toBe(4);
    expect(result).toBe(4);
  });

  it("No debe fallar si onAddToCart no es una función", function () {
    var result = window.QuantitySelectorLogic.handleAgregar(null, 3);
    expect(result).toBe(3);
  });

  it("Debe manejar cantidades borde", function () {
    var result = window.QuantitySelectorLogic.handleAgregar(function () {}, 1);
    expect(result).toBe(1);
  });

});

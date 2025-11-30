// ---------------------------------------------------------
// Footer.logic.spec.js
// Pruebas unitarias Jasmine para FooterLogic
// ---------------------------------------------------------

describe("FooterLogic.getFormattedDate", function () {

  it("Debe retornar la fecha formateada correctamente (caso válido)", function () {
    var date = new Date(2024, 0, 15); // 15 de enero de 2024
    var result = window.FooterLogic.getFormattedDate(date);

    expect(result).toBe("15/1/2024");
  });

  it("Debe retornar null si recibe un valor no válido", function () {
    var result = window.FooterLogic.getFormattedDate("texto");
    expect(result).toBeNull();
  });

  it("Debe manejar fechas con día/mes de un dígito (caso borde)", function () {
    var date = new Date(2024, 8, 5); // 5 septiembre 2024
    var result = window.FooterLogic.getFormattedDate(date);

    expect(result).toBe("5/9/2024");
  });

});

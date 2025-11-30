// ---------------------------------------------------------
// SearchBar.logic.spec.js
// Pruebas unitarias Jasmine para SearchBarLogic
// ---------------------------------------------------------

describe("SearchBarLogic.handleChange", function () {

  it("Debe retornar el nuevo valor y llamar a setQuery (caso válido)", function () {
    var received = null;
    function fakeSetQuery(v) { received = v; }

    var event = { target: { value: "teclado" } };

    var result = window.SearchBarLogic.handleChange(event, fakeSetQuery);

    expect(result).toBe("teclado");
    expect(received).toBe("teclado");
  });


  it("Debe retornar null si el evento es inválido", function () {
    var result = window.SearchBarLogic.handleChange(null, function () {});
    expect(result).toBeNull();
  });


  it("Debe retornar el valor pero NO fallar si setQuery no es función", function () {
    var event = { target: { value: "auriculares" } };

    var result = window.SearchBarLogic.handleChange(event, null);

    expect(result).toBe("auriculares");
  });

});


// ---------------------------------------------------------
// Tests para handleSubmit
// ---------------------------------------------------------
describe("SearchBarLogic.handleSubmit", function () {

  it("Debe prevenir el evento y llamar a onSearch con el query", function () {
    var prevented = false;
    var received = null;

    var fakeEvent = {
      preventDefault: function () { prevented = true; }
    };

    function fakeOnSearch(q) { received = q; }

    var result = window.SearchBarLogic.handleSubmit(fakeEvent, "monitor", fakeOnSearch);

    expect(prevented).toBeTrue();
    expect(received).toBe("monitor");
    expect(result).toBe("monitor");
  });


  it("Debe funcionar incluso si preventDefault no existe", function () {
    var received = null;

    function fakeOnSearch(q) { received = q; }

    var result = window.SearchBarLogic.handleSubmit({}, "silla", fakeOnSearch);

    expect(received).toBe("silla");
    expect(result).toBe("silla");
  });


  it("Debe retornar el query aunque onSearch no sea una función", function () {
    var fakeEvent = { preventDefault: function () {} };

    var result = window.SearchBarLogic.handleSubmit(fakeEvent, "router", null);

    expect(result).toBe("router");
  });

});

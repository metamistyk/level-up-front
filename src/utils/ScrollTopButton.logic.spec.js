// ---------------------------------------------------------
// ScrollTopButton.logic.spec.js
// Pruebas unitarias Jasmine para ScrollTopButtonLogic
// ---------------------------------------------------------

describe("ScrollTopButtonLogic.toggleVisibility", function () {

  it("Debe llamar a setIsVisible(true) cuando pageYOffset > 300", function () {
    var received = null;
    function fakeSet(v) { received = v; }

    var result = window.ScrollTopButtonLogic.toggleVisibility(500, fakeSet);

    expect(received).toBeTrue();
    expect(result).toBeTrue();
  });

  it("Debe llamar a setIsVisible(false) cuando pageYOffset <= 300", function () {
    var received = null;
    function fakeSet(v) { received = v; }

    var result = window.ScrollTopButtonLogic.toggleVisibility(200, fakeSet);

    expect(received).toBeFalse();
    expect(result).toBeFalse();
  });

  it("Debe retornar null si setIsVisible no es función", function () {
    var result = window.ScrollTopButtonLogic.toggleVisibility(500, null);
    expect(result).toBeNull();
  });

});


// ---------------------------------------------------------
// Tests para scrollToTop
// ---------------------------------------------------------
describe("ScrollTopButtonLogic.scrollToTop", function () {

  it("Debe llamar window.scrollTo con top=0 y behavior='smooth'", function () {
    var called = false;

    window.scrollTo = function (opts) {
      if (opts.top === 0 && opts.behavior === "smooth") {
        called = true;
      }
    };

    var result = window.ScrollTopButtonLogic.scrollToTop();

    expect(called).toBeTrue();
    expect(result).toBeTrue();
  });

  it("Debe retornar true aunque window.scrollTo no exista", function () {
    window.scrollTo = null;

    var result = window.ScrollTopButtonLogic.scrollToTop();

    expect(result).toBeTrue();
  });

  it("No debe lanzar errores si scrollTo no es una función", function () {
    window.scrollTo = "invalid";

    var result = window.ScrollTopButtonLogic.scrollToTop();

    expect(result).toBeTrue();
  });

});

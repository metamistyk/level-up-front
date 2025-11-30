// ---------------------------------------------------------
// QuantitySelector.logic.js
// Lógica pura del componente QuantitySelector
// Todas las funciones expuestas en window.QuantitySelectorLogic
// ---------------------------------------------------------

// Evita redeclaración en caso de múltiples imports
window.QuantitySelectorLogic = window.QuantitySelectorLogic || {};


// ---------------------------------------------------------
// aumentarCantidad(actual)
// • Aumenta la cantidad en 1
// • Retorna el nuevo valor
// ---------------------------------------------------------
window.QuantitySelectorLogic.aumentarCantidad = function (actual) {
  if (typeof actual !== "number") return 1;
  return actual + 1;
};


// ---------------------------------------------------------
// disminuirCantidad(actual)
// • Disminuye cantidad pero nunca baja de 1
// ---------------------------------------------------------
window.QuantitySelectorLogic.disminuirCantidad = function (actual) {
  if (typeof actual !== "number") return 1;

  var nuevo = actual - 1;
  if (nuevo < 1) nuevo = 1;

  return nuevo;
};


// ---------------------------------------------------------
// handleAgregar(onAddToCart, cantidad)
// • Llama a onAddToCart(cantidad) si es función
// • Retorna cantidad para facilitar tests
// ---------------------------------------------------------
window.QuantitySelectorLogic.handleAgregar = function (onAddToCart, cantidad) {
  if (typeof onAddToCart === "function") {
    onAddToCart(cantidad);
  }
  return cantidad;
};

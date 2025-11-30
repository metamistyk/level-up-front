// ---------------------------------------------------------
// ScrollTopButton.logic.js
// Lógica pura usada por el componente ScrollTopButton
// Todas las funciones se exponen bajo window.ScrollTopButtonLogic
// ---------------------------------------------------------

// Evita redeclaración si el archivo se importa múltiples veces
window.ScrollTopButtonLogic = window.ScrollTopButtonLogic || {};


// ---------------------------------------------------------
// toggleVisibility(pageYOffset, setIsVisible)
// • Determina si el botón debe mostrarse
// • Si pageYOffset > 300 → setIsVisible(true)
// ---------------------------------------------------------
window.ScrollTopButtonLogic.toggleVisibility = function (pageYOffset, setIsVisible) {
  if (typeof setIsVisible !== "function") return null;

  var visible = pageYOffset > 300;
  setIsVisible(visible);
  return visible;
};


// ---------------------------------------------------------
// scrollToTop()
// • Desplaza la página al inicio
// ---------------------------------------------------------
window.ScrollTopButtonLogic.scrollToTop = function () {
  if (typeof window.scrollTo === "function") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  return true;
};

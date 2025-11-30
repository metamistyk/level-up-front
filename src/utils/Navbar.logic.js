// ---------------------------------------------------------
// Navbar.logic.js
// Lógica pura para el componente Navbar
// Todas las funciones se exponen bajo window.NavbarLogic
// ---------------------------------------------------------

// Evita redeclaración si el archivo se importa más de una vez
window.NavbarLogic = window.NavbarLogic || {};


// ---------------------------------------------------------
// handleChange(searchQuery, event, onSearch)
// Lógica pura del cambio en el input de búsqueda
// • Lee el valor del input
// • Llama a la función onSearch con el nuevo valor
// ---------------------------------------------------------
window.NavbarLogic.handleChange = function (searchQuery, event, onSearch) {
  if (!event || !event.target) return null;
  const value = event.target.value;

  if (typeof onSearch === "function") {
    onSearch(value);
  }

  return value;
};

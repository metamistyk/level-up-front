// ---------------------------------------------------------
// SearchBar.logic.js
// Lógica pura para el componente SearchBar
// Todas las funciones se exponen bajo window.SearchBarLogic
// ---------------------------------------------------------

// Evita redeclaración si el archivo se importa más de una vez
window.SearchBarLogic = window.SearchBarLogic || {};


// ---------------------------------------------------------
// handleChange(event, setQuery)
// Lógica del cambio en el input
// • Obtiene el nuevo valor del campo
// • Llama a setQuery con el valor nuevo
// ---------------------------------------------------------
window.SearchBarLogic.handleChange = function (event, setQuery) {
  if (!event || !event.target) return null;

  var value = event.target.value;

  if (typeof setQuery === "function") {
    setQuery(value);
  }

  return value;
};


// ---------------------------------------------------------
// handleSubmit(event, query, onSearch)
// Lógica del envío de formulario
// • Previene el comportamiento por defecto
// • Llama a onSearch(query) si es función
// ---------------------------------------------------------
window.SearchBarLogic.handleSubmit = function (event, query, onSearch) {
  if (event && typeof event.preventDefault === "function") {
    event.preventDefault();
  }

  if (typeof onSearch === "function") {
    onSearch(query);
  }

  return query;
};

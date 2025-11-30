// ---------------------------------------------------------
// Footer.logic.js
// Lógica pura para el componente Footer
// Todas las funciones se exportan en window.FooterLogic
// ---------------------------------------------------------

// Evita redeclaración si el archivo se importa múltiples veces
window.FooterLogic = window.FooterLogic || {};


// ---------------------------------------------------------
// getFormattedDate(dateObj)
// • Recibe un objeto Date
// • Retorna la fecha formateada: "DD/MM/YYYY"
// ---------------------------------------------------------
window.FooterLogic.getFormattedDate = function (dateObj) {
  if (!(dateObj instanceof Date)) return null;

  var day = dateObj.getDate();
  var month = dateObj.getMonth() + 1;
  var year = dateObj.getFullYear();

  return day + "/" + month + "/" + year;
};

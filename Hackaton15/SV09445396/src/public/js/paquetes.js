// Obtener la ventana modal
const modal = document.getElementById("customAlertModal");

// Obtener el elemento <span> que cierra la ventana modal
const span = document.getElementsByClassName("close")[0];

// Obtener el botón "Aceptar" dentro de la ventana modal
const okBtn = document.getElementById("modalOkBtn");

// Cuando el usuario hace clic en <span> (x) o en el botón "Aceptar", cierra la ventana modal
span.onclick = function() {
  modal.style.display = "none";
}

okBtn.onclick = function() {
  modal.style.display = "none";
}

// Cuando el usuario hace clic en cualquier lugar fuera de la ventana modal, cierra la ventana modal
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Función para mostrar un mensaje en la ventana modal
function showModalMessage(title, message) {
    const titleElement = document.getElementById("modalTitle");
    const messageElement = document.getElementById("modalMessage");
    titleElement.textContent = title;
    messageElement.textContent = message;
    modal.style.display = "block";
  }
  
  
  
// En el navegador para importar una funcion se usa el siguiente formato: debe ir la extension
import { loadNotes, onNewNote, onSelected } from "./socket.js";
import { onHandleSubmit, renderNotes, appenNote, fillForm } from "./ui.js";

// renderNotes()
onNewNote(appenNote)    // Añade mensaje en el HTML cuando se ingresa un nuevo mensaje
loadNotes(renderNotes)  // Carga mensajes en el HTML cuando se ingresa a la pagina
onSelected(fillForm)

// Manejo del formulario
const noteForm = document.querySelector("#noteForm");

// Cuando el formalario ejecute el evento 'submit'
noteForm.addEventListener('submit', onHandleSubmit )


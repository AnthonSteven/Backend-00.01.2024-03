// Funciones que van a interactuar con la interfas de usuario
// Ejm: Click en un formulario
import {saveNote, deleteNote, getNoteById, updateNote } from "./socket.js";

const notesList = document.querySelector("#notes");
const title = document.querySelector("#title");

let savedId = "";

const noteUI = note => {
    const div = document.createElement('div')

    div.innerHTML = `
        <div class="card card-body mb-2 cont-display">
            <div class="d-flex justify-content-between">
                <p>${note.title}</p>
                <div>
                    <button class="btn-del delete btn-cont" data-id="${note._id}">Delete</button>
                    <button class="btn-upd  update" data-id="${note._id}">Update</button>
                </div>
            </div>
        </div>
    `
    const btnDelete = div.querySelector('.delete')
    const btnUpdate = div.querySelector('.update')
    btnDelete.addEventListener('click', () => deleteNote(btnDelete.dataset.id))
    btnUpdate.addEventListener('click', () => getNoteById(btnUpdate.dataset.id))

    return div
}

export const renderNotes = notes => {
    notesList.innerHTML = ''

    // Por cada nota que recorra se añadira un elemento en javascript a otro
    // elemento HTML usando 'append' ya no innerHTML += ``
    notes.forEach(note => notesList.append( noteUI(note) ))
};

export const fillForm = (note) => {
    title.value = note.title;
    savedId = note._id;
};

export const onHandleSubmit = (e) => {
    e.preventDefault()
    
    if(title.value.length != 0) {
        if (savedId) {
            updateNote(savedId, title.value);
          } else {
            saveNote(title.value);
          }
    }

    savedId = "";
    title.value = "";
    description.value = "";
};

export const appenNote = note => {
    notesList.append( noteUI(note) )
}


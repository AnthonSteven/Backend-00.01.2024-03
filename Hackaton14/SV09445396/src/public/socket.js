// CLIENTE[Front-End] ===> Servidor[Bacl-End]   [Conexion Bidireccional]
// con este socket se puede emitir eventos.
const socket = io.connect();

// Escucha de evento
export const loadNotes = (callback) => {
  // Escucha el evento 'server:loadnotes' que viene del servidor
  // 'server:loadnotes' esta defindo en [sockets.js]
  socket.on('server:loadnotes', callback )
};

// Emision de evento
export const saveNote = (title) => {
  // Cliente envia un evento llamado 'client:newnote'
  socket.emit("client:newnote", {
    title
  });
};
  
// Cuando el servidor envia el evento
export const onNewNote = (callback) => {
  socket.on("server:newnote",callback);
};

export const deleteNote = id => {
  socket.emit('client:deletenote', id)
}

export const getNoteById = (id) => {
  socket.emit("client:getnote", id);
};

export const onSelected = (callback) => {
  socket.on('server:selectednote', callback )
}

// Emitir evento: "client:updatenote" para enviarlo al Backend
export const updateNote = (id, title) => {
  socket.emit("client:updatenote", { _id:id, title,} );
};


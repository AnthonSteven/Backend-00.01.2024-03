// BACKEND

// Enviar lista de notas
import Note from "./models/Note";

// SERVIDOR[Back-End] ===> Cliente [Front-End]
// io: Escucha eventos que viene del socket [main.js]
export default (io) => {
    io.on("connection", (socket) => {  
       // console.log("nuevo socket connectado:", socket.id);

        const emitNotes = async () => {
           const notes = await Note.find();
           io.emit('server:loadnotes',notes)
        };

        emitNotes()

        // Cuando el cliente te envia el evento 'client:newnote' escuchalo
        socket.on("client:newnote", async (data) => {
            const newNote = new Note(data);
            const savedNote = await newNote.save();

            // Enviar al cliente la nota ingresada
            // console.log(savedNote)

            io.emit("server:newnote", savedNote);
        });

        socket.on("client:deletenote", async (id) => {
            // console.log(id);
            await Note.findByIdAndDelete(id)
            emitNotes()
        })


        socket.on('client:getnote', async (id) => {
            const note = await Note.findById(id)
            // console.log(note)
            io.emit('server:selectednote',note)
        })

        // Evento 'client:updatenote' definido en el cliente [src/public/socket.js]
        socket.on("client:updatenote", async (updateNote) => {
            // console.log(data)
            await Note.findByIdAndUpdate(updateNote._id, {
                title: updateNote.title
            })
            emitNotes()
        });

    })
}


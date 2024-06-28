require("dotenv").config();
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const port = process.env.PORT || 3000;
app.use(express.static("public"));


io.on("connection", (socket) => {
    console.log("New user connected");
    socket.on("sendMessage", async (message, callback) => {
        try {
            console.log(message);

            callback();
        } catch (error) {
            console.error(error);
            callback("Error: Unable to connect to the chatbot");
        }
    });

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


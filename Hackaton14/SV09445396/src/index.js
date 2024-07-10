
import app from "./app";
import { Server as WebSocketServer } from "socket.io";
import http from "http";

// Configuracion del ChatGPT
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
// Configuracion del ChatGPT


import Sockets from "./sockets";
import { connectDB } from "./db";

connectDB();

const server = http.createServer(app);
const httpServer = server.listen(3000);
console.log("Servidor conectado al puerto 3000")


const io = new WebSocketServer(httpServer);
Sockets(io);

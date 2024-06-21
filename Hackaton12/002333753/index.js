const http = require("http");
const url = require("url");

let listSales = [];


const serverHackaton = http.createServer((req, res) => {
   

    const parseUrl= url.parse(req.url, true);
    const path = parseUrl.pathname;

    if (req.method == "POST" && path === "/sales") {
        console.log("estas creando");
        let body = "";
        console.log(req.on);

        req.on("data", (chuck) => {
            console.log(chuck);
            body += chuck.toString();
        });

        return req.on("end", () => {
            const  {name, description, date } = JSON.parse(body);

            if(!name || !description || !date) {

                res.writeHead(400, { "Content-Type": "application/json"});
                return res.end(JSON.stringify({ message: "Faltan campos" }));
            
            } else {
                console.log(name, description, date);
                
                listSales.push({ name, description, date });

                req.writeHead(201, {"Content-type": "application/json"});
                return res.end(JSON.stringify(listSales));
            }
        });
    }
    
    res.writeHead(404 , { "Content-type": "application/json"});
    res.end("recurso no encontrado");
});

serverHackaton.listen(3000);const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log("Example app listening on port " + port);
});
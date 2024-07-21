
let arrGundams = [];

let objLocalGundams = localStorage.getItem("gundams");
if (objLocalGundams != null) 
{
    arrGundams = JSON.parse(objLocalGundams);
}

let login = JSON.parse(sessionStorage.getItem("login"));
if (login == null) {
  window.location.replace("http://127.0.0.1:5500/Semana06Sesion01/sv47008546b/login.html");
}
else {
  if (!login.login)
    console.log("No se debe recordar las credenciales")
}

$("#btnAgregar").on("click", function (event) {
    event.preventDefault();
    console.log("Agregando un nuevo");
    let nombre = prompt("Agrega el nombre");
    let descripcion = prompt("Agregar la descripcion");
    let imagen = prompt("Agrega la imagen");
    let escala = prompt("Agrega la escala");
    let custom = "";
    let isCustom = prompt("Esta modificado");
    if (isCustom == "SI") {
        custom = prompt("Que le modificaste")
    }; // custom es un boleano, colocaremos un ternario.

    let objGundam = new Gundam(nombre, descripcion, imagen, escala, (isCustom == "SI" ? true : false), (isCustom == "SI" ? custom : ""))
    arrGundams.push(objGundam);
    console.log(arrGundams);
    localStorage.setItem("gundams", JSON.stringify(arrGundams));
    $('#table').bootstrapTable('load', arrGundams);

})
init();
function init(){
    $('#table').bootstrapTable();
    $('#table').bootstrapTable('load', arrGundams);
}

class Gundam {
    constructor(nombre, descripcion, imagen, escala, isCustom = false, custom = "") {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.imagen = imagen;
        this.escala = escala;
        this.isCustom = isCustom;
        this.custom = custom;
    }
}


class Celular {
    constructor(marca, nSerie, IMEI, estadoBateria, estadoBocinas, estadoPantalla, estadoConexiones, estadoCarga, reportado) {
        this.marca = marca;
        this.nSerie = nSerie;
        this.IMEI = IMEI;
        this.estadoBateria = estadoBateria;
        this.estadoBocinas = estadoBocinas;
        this.estadoPantalla = estadoPantalla;
        this.estadoConexiones = estadoConexiones;
        this.estadoCarga = estadoCarga;
        this.reportado = reportado;
    }
}

class Tecnico {
    constructor(nombre, especialidad, costo) {
        this.nombre = nombre;
        this.especialidad = especialidad;
        this.costo = costo;
    }
}


// Creación de objetos Celular y Tecnico
const objCelular1 = new Celular("Apple", "49JN409K5FJ", "350494114233221", true, true, false, false, false, false);
const objCelular2 = new Celular("Android", "94HG207J9SF", "673223187225462", false, false, false, true, true, false);
const objCelular3 = new Celular("Android", "45YT88JK455", "856126429858723", true, true, false, true, true, false);
const objCelular4 = new Celular("Ipad", "78MH64LK98B", "749737659025381", false, false, false, false, false, false);
const objCelular5 = new Celular("Apple", "71GT04TZ27L", "725638164901485", false, true, false, true, false, false);
const objCelular6 = new Celular("Tablet", "48CT93MY47P", "629476894926104", true, true, true, true, false, false);

const objTecnico1 = new Tecnico("Miguel", "Apple", 150);
const objTecnico2 = new Tecnico("Carlos", "Android", 100);
const objTecnico3 = new Tecnico("Manolo", "Ipad", 200);
const objTecnico4 = new Tecnico("Elvis", "Tablet", 180);

// Arrays
const arrayCelulares = [objCelular1, objCelular2, objCelular3, objCelular4, objCelular5, objCelular6];
const arrayTecnicos = [objTecnico1, objTecnico2, objTecnico3, objTecnico4];
const numeroDeFallos = [];
const arrayEstados = [];
const arrayReparaciones = [];

const arrayWebStorage = [];

let parseado;

// Selección de elementos del DOM
const arraySelect = document.getElementsByClassName("serie");
for (let i = 0; i < arraySelect.length; i++) {
    arraySelect[i].textContent = arrayCelulares[i].nSerie;
}
const selectEstados = document.getElementById("selectEstados");
selectEstados.addEventListener("change", function () {
    document.getElementById("reparaciones").textContent = "";
    if (selectEstados.value == "Diagnostico") {
        estado = 0;
        muestraDatosEstados();
        muestraDiagnostico();
    }
    if (selectEstados.value == "Reparación") {
        estado = 1;
        muestraDatosEstados();
        muestraDiagnostico();
    }
    if (selectEstados.value == "R. + repuestos") {
        estado = 1;
        muestraDatosEstados();
        muestraDiagnostico();
        muestraRepuestos();
    }
})

const cajas = document.getElementsByClassName("cajaDiag");
const btnContinuar = document.getElementById('continuar');
const btnEstados = document.getElementById('selectEstados');
const btnContinuar2 = document.getElementById('continuar2');
const btnPagar = document.getElementById('btnPagar');

// Asignación de eventos

btnContinuar.addEventListener("click", function (event) {
    event.preventDefault();
    respuesta = serieSelect.value;
    document.getElementById("diagnostico").style.display = "flex";
    muestraDatos();
    añadeEstado();
    muestraDiagnostico();
});

serieSelect.addEventListener("change", function () {
    respuesta = serieSelect.value;
    for (let i = 0; i < arrayCelulares.length; i++) {
        if (respuesta == arrayCelulares[i].nSerie) {
            document.getElementById("imei").textContent = arrayCelulares[i].IMEI;
            comparaWebStorage();
        }
    }

});


btnContinuar2.addEventListener("click", detectaErrores);

btnPagar.addEventListener("click", firmaYAbono);

// Funciones
function muestraDatos() {
    for (let i = 0; i < arrayCelulares.length; i++) {
        if (respuesta == arrayCelulares[i].nSerie) {
            document.getElementById("marca").textContent = arrayCelulares[i].marca;
            document.getElementById("nSerie").textContent = arrayCelulares[i].nSerie;
            document.getElementById("IMEI").textContent = arrayCelulares[i].IMEI;
            document.getElementById("estadoBateria").textContent = arrayCelulares[i].estadoBateria ? "batería" : "-";
            document.getElementById("estadoBocinas").textContent = arrayCelulares[i].estadoBocinas ? "bocinas" : "-";
            document.getElementById("estadoPantalla").textContent = arrayCelulares[i].estadoPantalla ? "pantalla" : "-";
            document.getElementById("estadoConexiones").textContent = arrayCelulares[i].estadoConexiones ? "conexiones" : "-";
            document.getElementById("estadoCarga").textContent = arrayCelulares[i].estadoCarga ? "carga" : "-";
        }
    }
}
function muestraDiagnostico() {
    for (let i = 0; i < cajas.length; i++) {
        if (cajas[i].textContent != "-") {
            cajas[i].style.backgroundColor = "#2eb872";
        } else {
            cajas[i].style.backgroundColor = "red";
        }
    }
}

function detectaErrores() {
    console.log("Detectando errores...");
    if (document.getElementById("precio").textContent.length == 0) {
        for (let i = 0; i < cajas.length; i++) {
            if (cajas[i].style.backgroundColor == "red") {
                numeroDeFallos.push(cajas[i]);
            }
        }
        escogeTecnico();
        document.getElementById("info").style.display = "flex";
    }
}

function escogeTecnico() {
    for (let i = 0; i < arrayTecnicos.length; i++) {
        if (cajas[0].textContent == arrayTecnicos[i].especialidad) {
            totalAPagar = (numeroDeFallos.length * 100) + arrayTecnicos[i].costo;
            document.getElementById("tecnicoNombre").textContent = arrayTecnicos[i].nombre;
            document.getElementById("tecnicoEspecialidad").textContent = arrayTecnicos[i].especialidad;
            document.getElementById("precio").textContent = totalAPagar / 2;
        }
    }
}

function firmaYAbono() {
    if (document.getElementById("firma").value.length > 0) {
        alert("Espere un momento en lo que termina la reparación...");
        alert("Reparación completa");
        reparaAparato();
    } else {
        alert("Introduzca su firma");
    }
}

function reparaAparato() {
    for (let i = 0; i < arrayCelulares.length; i++) {
        if (respuesta == arrayCelulares[i].nSerie) {
            agregaRepuestos(i);
            arrayCelulares[i].estadoBateria = true;
            arrayCelulares[i].estadoBocinas = true;
            arrayCelulares[i].estadoCarga = true;
            arrayCelulares[i].estadoConexiones = true;
            arrayCelulares[i].estadoPantalla = true;
            muestraDatos();
            muestraDiagnostico();
            añadeEstado();
            document.getElementById("selectEstados").style.display = "block";
            añadeWebStorage();

        }
    }
}
function añadeEstado() {
    for (let i = 0; i < arrayCelulares.length; i++) {
        if (respuesta == arrayCelulares[i].nSerie) {
            let objEstado = new Object();
            objEstado.marca = arrayCelulares[i].marca;
            objEstado.nSerie = arrayCelulares[i].nSerie;
            objEstado.IMEI = arrayCelulares[i].IMEI;
            objEstado.estadoBateria = arrayCelulares[i].estadoBateria;
            objEstado.estadoBocinas = arrayCelulares[i].estadoBocinas;
            objEstado.estadoPantalla = arrayCelulares[i].estadoPantalla;
            objEstado.estadoConexiones = arrayCelulares[i].estadoConexiones;
            objEstado.estadoCarga = arrayCelulares[i].estadoCarga;
            arrayEstados.push(objEstado);
        }
    }

}
function muestraDatosEstados() {
    document.getElementById("marca").textContent = arrayEstados[estado].marca;
    document.getElementById("nSerie").textContent = arrayEstados[estado].nSerie;
    document.getElementById("IMEI").textContent = arrayEstados[estado].IMEI;
    document.getElementById("estadoBateria").textContent = arrayEstados[estado].estadoBateria ? "bateria" : "-";
    document.getElementById("estadoBocinas").textContent = arrayEstados[estado].estadoBocinas ? "bocinas" : "-";
    document.getElementById("estadoPantalla").textContent = arrayEstados[estado].estadoPantalla ? "pantalla" : "-";
    document.getElementById("estadoConexiones").textContent = arrayEstados[estado].estadoConexiones ? "conexiones" : "-";
    document.getElementById("estadoCarga").textContent = arrayEstados[estado].estadoCarga ? "carga" : "-";
}
function muestraDatosStorage(index) {
    document.getElementById("marca").textContent = parseado[index].marca;
    document.getElementById("nSerie").textContent = parseado[index].nSerie;
    document.getElementById("IMEI").textContent = parseado[index].IMEI;
    document.getElementById("estadoBateria").textContent = parseado[index].estadoBateria ? "bateria" : "-";
    document.getElementById("estadoBocinas").textContent = parseado[index].estadoBocinas ? "bocinas" : "-";
    document.getElementById("estadoPantalla").textContent = parseado[index].estadoPantalla ? "pantalla" : "-";
    document.getElementById("estadoConexiones").textContent = parseado[index].estadoConexiones ? "conexiones" : "-";
    document.getElementById("estadoCarga").textContent = parseado[index].estadoCarga ? "carga" : "-";
}
function agregaRepuestos(i) {
    if (arrayCelulares[i].estadoBateria == false) {
        arrayReparaciones.push("Bateria Nueva");
    }
    if (arrayCelulares[i].estadoBocinas == false) {
        arrayReparaciones.push("Bocinas Nuevas");
    }
    if (arrayCelulares[i].estadoPantalla == false) {
        arrayReparaciones.push("Pantalla Nueva");
    }
    if (arrayCelulares[i].estadoCarga == false) {
        arrayReparaciones.push("Puerto de carga Nuevo");
    }
}
function muestraRepuestos() {
    document.getElementById("reparaciones").textContent = arrayReparaciones.join(" - ");
}
function añadeWebStorage() {
    // Obtiene el valor actual del LocalStorage
    let storedArray = JSON.parse(localStorage.getItem("array")) || [];
    // Agrega el nuevo elemento al array
    storedArray.push(arrayEstados[arrayEstados.length - 1]);
    // Guarda el array actualizado en el LocalStorage
    localStorage.setItem("array", JSON.stringify(storedArray));

}
function comparaWebStorage() {
    parseado = JSON.parse(localStorage.getItem("array"));
    let encontrado = false; // Variable para verificar si se encontró una coincidencia
    for (let i = 0; i < parseado.length; i++) {
        if (respuesta == parseado[i].nSerie) {
            document.getElementById("diagnostico").style.display = "flex";
            let index = i;
            muestraDatosStorage(index);
            muestraDiagnostico();
            encontrado = true; // Se encontró una coincidencia
            break; // Salir del bucle ya que se encontró una coincidencia
        }
    }
    // Si no se encontró ninguna coincidencia, oculta el elemento "diagnostico"
    if (!encontrado) {
        document.getElementById("diagnostico").style.display = "none";
    }
}


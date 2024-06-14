/**
 * Sistema de reserva de vuelos
 * Aviones
 * Pasajeros
 * Rutas -> Aereopuertos
 * Reserva 
 * 
 */

const Reserva = function () //a
{
    let Ciudad;
    let Nombre;
    let arrAviones = [];
    
    function configurar() {
        console.log("Iniciando la Configuracion");
        $("#titulo").text(Nombre)
        $("#ciudad").text(Ciudad);
        $("#aerolinea").text(Nombre)
        crearAviones();
    }
    function crearAviones() {
        let objAvion = new Aviones("LIM-009", "Airbus 320 Neo", 186, 90);
        arrAviones.push(objAvion);
        let objAvion1 = new Aviones("UIO-011", "Airbus 319", 124, 62);
        arrAviones.push(objAvion1);
    }

    function eventos() {
        console.log("Escuchando los eventos")
        $("#reservar").on("click", reservar);
    }

    async function reservar() {
        $("#divReserva").hide();
        console.log("Reservando Vuelo");

        const { value: formValues } = await Swal.fire({
            title: "Ingresa tus datos",
            icon: "info",
            html: `
            <label class="col-md-4 control-label" for="textinput">Origen</label>  
            <input id="origen" class="swal2-input">
            <label class="col-md-4 control-label" for="textinput">Destino</label>  
            <input id="destino" class="swal2-input">
            <label class="col-md-4 control-label" for="textinput">Fecha de Ida</label>  
            <input id="fechaIda" class="swal2-input">
            <label class="col-md-4 control-label" for="textinput">Fecha de Retorno</label>  
            <input id="fechaRetorno" class="swal2-input">
            `,
            showCloseButton: true,
            showCancelButton: true,
            confirmButtonText: "Guardar",
            denyButtonText: `Cancelar`,
            preConfirm: () => {
                return {
                    origen:  document.getElementById("origen").value,
                    destino: document.getElementById("destino").value,
                    fechaIda:  document.getElementById("fechaIda").value,
                    fechaRegreso:  document.getElementById("fechaRetorno").value
                };
            }
        });
        if (formValues) {
            let reserva =new Reservas(formValues.origen, formValues.destino, formValues.fechaIda, formValues.fechaRegreso);
            let objPasajero = agregarPasajeros().then(data =>{
                reserva.asignarAvionIda(arrAviones[0]);
                reserva.asignarAvionVuelta(arrAviones[1]);
                reserva.avionIda.agregarPasajeros(data);
                reserva.avionVuelta.agregarPasajeros(data);
                dibujarReserva(reserva);
            });
            
            
        }
       
    }

    function dibujarReserva(reserva){
        console.log(reserva);
        $("#idaNombre").val(reserva.avionIda.arrPasajeros[0].nombres);
        $("#idaApellido").val(reserva.avionIda.arrPasajeros[0].apellidos);
        $("#idaFecha").val(reserva.fechaIda);
        $("#idaVuelo").val(reserva.avionIda.matricula);
        $("#idaOrigen").val(reserva.origen);
        

        $("#retNombre").val(reserva.avionVuelta.arrPasajeros[0].nombres);
        $("#retApellido").val(reserva.avionVuelta.arrPasajeros[0].apellidos);
        $("#retFecha").val(reserva.fechaVuelta);
        $("#retVuelo").val(reserva.avionVuelta.matricula);
        $("#retDestino").val(reserva.destino);
        
        $("#divReserva").show();

    }
    async function agregarPasajeros() {
        console.log("Agregar Pasajeros");

        const { value: formValues } = await Swal.fire({
            title: "Ingresa los datos del pasajero",
            icon: "info",
            html: `
            <label class="col-md-4 control-label" for="textinput">Nombre</label>  
            <input id="nombre" class="swal2-input">
            <label class="col-md-4 control-label" for="textinput">Apellido</label>  
            <input id="apellido" class="swal2-input">
            <label class="col-md-4 control-label" for="textinput">Documento</label>  
            <input id="documento" class="swal2-input">
            
            `,
            showCloseButton: true,
            showCancelButton: true,
            confirmButtonText: "Guardar",
            denyButtonText: `Cancelar`,
            preConfirm: () => {
                return {
                    nombre:  document.getElementById("nombre").value,
                    apellido: document.getElementById("apellido").value,
                    documento:  document.getElementById("documento").value
                };
            }
        });
        if (formValues) {
            let pasajero =new Pasajeros(formValues.nombre, formValues.apellido, formValues.documento);
            return pasajero;
        }
    }


    return {
        init: function (parametros) {
            console.log(parametros)
            Nombre = parametros.nombre;
            Ciudad = parametros.ciudad;
            configurar();
            eventos();
        },
    };
}();

class Aviones {
    constructor(matricula, modelo, nroAsientos, capacidadMinima) {
        this.matricula = matricula;
        this.modelo = modelo;
        this.nroAsientos = nroAsientos;
        this.capacidadMinima = capacidadMinima;
        this.arrPasajeros = [];
        this.habilitado = false;
        this.reservado = 0
    }
    agregarPasajeros(pasajero) {
        if (this.reservado >= this.capacidadMinima) {
            this.habilitado = true;
        }
        this.arrPasajeros.push(pasajero);
        this.reservado++;
    }
}
class Reservas {
    constructor(origen, destino, fechaIda, fechaVuelta) {
        this.origen = origen;
        this.destino = destino;
        this.fechaIda = fechaIda;
        this.fechaVuelta = fechaVuelta;
        this.avionIda = null;
        this.avionVuelta = null;
    }
    asignarAvionIda(avion) {
        this.avionIda = avion;
    }
    asignarAvionVuelta(avion) {
        this.avionVuelta = avion;
    }
}

class Pasajeros{
    constructor(nombres, apellidos, nrodocumento){
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.nrodocumento = nrodocumento
    }
}
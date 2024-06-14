const Servicio = function () { //actividad principal del comercio
    let Nombre;
    let Ciudad;
    let arrTecnico = [];

    function configurar() {
        console.log('iniciando la configuracion')
        $("#titulo").text(Nombre)
        $("#ciudad").text(Ciudad);
        crearTecnico();
    }
    function crearTecnico() {
        let tecnico1 = new tecnico('Alexander', 'Alvarado', ['Samsung', 'Apple', 'Huawei']);
        arrTecnico.push(tecnico1);
        let tecnico2 = new tecnico('Robert', 'Castolo', ['LG', 'Motrola', 'Redmi']);
        arrTecnico.push(tecnico2);
    }

    function eventos() {
        console.log('escuchando los eventos')

        $("#registrar").on("click", registrarTelefono);
    }
    async function registrarTelefono() {  // reservar
        $("#divRegistro").hide();
        console.log("Registrando Telefono");
        const { value: formValues } = await Swal.fire({
            title: "Registre su telefono",
            html: `
            <label class="col-md-4 control-label" for="textinput">Ingrese el modelo del telefono</label>  
            <input id="modeloTelefono" class="swal2-input">
            <label class="col-md-4 control-label" for="textinput">Ingrese la marca del telefono</label>  
            <input id="marcaTelefono" class="swal2-input">
            <label class="col-md-4 control-label" for="textinput">Ingrese la serie del telefono a reparar</label>  
            <input id="serieTelefono" class="swal2-input">
            <label class="col-md-4 control-label" for="textinput">Ingrese el imei del telefono a reparar</label>  
            <input id="imeiTelefono" class="swal2-input">
            <label class="col-md-4 control-label" for="textinput">Ingrese el estado del telefono</label>  
            <input id="estadoTelefono" class="swal2-input">
            <label class="col-md-4 control-label" for="textinput">Ingrese la falla del telefono</label>  
            <input id="fallaTelefono" class="swal2-input">
            `,
            showCloseButton: true,
            showCancelButton: true,
            confirmButtonText: "Guardar",
            denyButtonText: `Cancelar`,
            preConfirm: () => {
                return {
                    modelo: document.getElementById("modeloTelefono").value,
                    marca: document.getElementById("marcaTelefono").value,
                    estado: document.getElementById("serieTelefono").value,
                    falla: document.getElementById("imeiTelefono").value,
                    serie: document.getElementById("estadoTelefono").value,
                    imei: document.getElementById("fallaTelefono").value,
                };
            }
        });
        if (formValues) {
            let registro = new telefono(formValues.modelo, formValues.marca,formValues.serie, formValues.imei, formValues.estado, formValues.falla);
            let objClientes = registrarCLiente().then(data => {
                registro.asignarTecnico(arrTecnico[0]);
                //registro.asignarTecnico(arrTecnico[1]);
                registro.registrarCLiente(data),
                    dibujarRegistro(registro);
            });
        }
    }

    function dibujarRegistro(registro) {
        console.log(registro);
        $("#inModelo").val(registro.modelo);
        $("#inMarca").val(registro.marca);
        $("#inEstado").val(registro.estado);
        $("#inFalla").val(registro.falla);
        $("#inSerie").val(registro.serie);
        $("#inImei").val(registro.imei);
       
        
        $("#inNombre").val(registro.arrClientes[0].nombreCliente);
        $("#inApellido").val(registro.arrClientes[0].last);
        $("#inNro").val(registro.arrClientes[0].nroCel);
        $("#inEmail").val(registro.arrClientes[0].mail);
                
        $("#divRegistro").show();
    }
    async function registrarCLiente() {
        //$("#divReserva").hide();
        console.log("Agregando Clientes");

        const { value: formValues } = await Swal.fire({
            title: "Registre sus datos",
            html: `,
            <label class="col-md-4 control-label" for="textinput">Ingrese su nombre</label>  
            <input id="nameCliente" class="swal2-input">
            <label class="col-md-4 control-label" for="textinput">Ingrese su apellido</label>  
            <input id="lastCliente" class="swal2-input">
            <label class="col-md-4 control-label" for="textinput">Ingrese su numero de celular</label>  
            <input id="celCliente" class="swal2-input">
            <label class="col-md-4 control-label" for="textinput">Ingrese su correo</label>  
            <input id="mailCliente" class="swal2-input">
            `,
            showCloseButton: true,
            showCancelButton: true,
            confirmButtonText: "Guardar",
            denyButtonText: `Cancelar`,
            preConfirm: () => {
                return {
                    nombreCliente: document.getElementById("nameCliente").value,
                    last: document.getElementById("lastCliente").value,
                    nroCel: document.getElementById("celCliente").value,
                    mail: document.getElementById("mailCliente").value,
                };
            }
        });
        if (formValues) {
            let registro2 = new cliente(formValues.nombreCliente, formValues.last, formValues.nroCel, formValues.mail);
            return registro2;
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

class telefono { //Reservas
    constructor(modelo, marca, estado, falla, serie, imei) {
        this.modelo = modelo;
        this.marca = marca;
        this.estado = estado;
        this.falla = falla;
        this.serie = serie;
        this.imei = imei;
        this.habilitado = false;
        this.arrClientes = [];
        this.nroClientes = 0;
        
    }

    registrarCLiente(registro2) {
        if(this.nroClientes >= 0){
            this.habilitado = true
        }
        this.arrClientes.push(registro2);
        this.nroClientes++;
        //asignarCliente();
        //this.nombreCliente = clienteFono;
    }

    asignarTecnico(tecnico) {
        this.tecnicoAsignado = tecnico;
    }
    // autorizarReparacion(autorizar) {
    //     if (this.autorizar.abono >= 0) {
    //         this.habilitado = true;
    //     }
    // }
}
class cliente {
    constructor(nombreCliente, last, nroCel, mail) {
        this.nombreCliente = nombreCliente;
        this.last = last;
        this.nroCel = nroCel;
        this.mail = mail;
        this.clienteFono = null;      
    }
    asignarCliente(clientito) {
        this.clienteFono = clientito;
    }

}
class autorizar {
    constructor(abono) {
        this.abono = this.tecnico.costoReparacion * 0.5;
    }
}
class tecnico {
    constructor(nameTecnico, lastTecnico, skillMarca, costoReparacion) {
        this.nameTecnico = nameTecnico;
        this.lastTecnico = lastTecnico;
        this.skillMarca = skillMarca;
        this.costoReparacion = costoReparacion;

    }
}

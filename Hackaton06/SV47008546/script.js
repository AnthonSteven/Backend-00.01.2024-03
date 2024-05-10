// EL PROBLEMA: 

// Se necesita crear un sistema que maneje las reparaciones de celulares en un local con varias sucursales
// Tomar en cuenta los siguientes casos de uso:
// - El telefono ingresado debe tener numero de serie e IMEI que no esten reportados para acceder al servicio
// - Un telefono primero debe pasar por una primera revision y se debe guardar el primer diagnostico
// - Se debe tener la autorizacion escrita del usuario y el abono del 50% de la reparacion para que acceda al servicio
// - Los tecnicos pueden tener uno o varios skills que se adecuen a la marca de telefono que se necesita acceder al servicio
// - Los repuestos se agregaran a la reparacion de telefono
// - Se debe mostrar el estado del equipo en sus diferentes estaciones de trabajo 

// Primer paso inicializar un objeto con esta funcionalidad:
const SistemaCelular = function () {
    let Nombre;
    let Servicio;
    let arrCelulares = [];

    function configurar() {
        console.log("Iniciando la configuracion")
        $("#titulo").text(Nombre)
        $("#servicio").text(Servicio)
        crearCelulares();
    }
    function crearCelulares() {
        let objCelulares = new Celulares("Samsung", "Galaxy Fold 2", 55555555);
        arrCelulares.push(objCelulares);
        let objCelulares2 = new Celulares("Samsung", "Galaxy Z Fold 3", 22222222);
        arrCelulares.push(objCelulares2);

    }
    // Tercer paso, todos los eventos que generara nuestra pagina web.
    function eventos() {
        console.log("Escuchando los eventos")
        $("#soporte").on("click", soporte);
    }
    // Aqui empieza la magia de las conexiones de funciones y clases.
    async function soporte() {
        console.log("Solicitando Asistencia Tecnica");

        const { value: formValues } = await Swal.fire({
            title: "INGRESE SUS DATOS",
            icon: "info",
            html: `
                <label class="col-md-4 control-label" for="textinput">Ingrese su Nombre Completo</label>
                <input id="nombreCliente" class="swal2-input">
                <label class="col-md-4 control-label" for="textinput">Ingrese su Correo</label>
                <input id="correoCliente" class="swal2-input">
                <label class="col-md-4 control-label" for="textinput">Ingrese su Nro de Celular</label>
                <input id="telefonoCliente" class="swal2-input">   
                <label class="col-md-4 control-label" for="textinput">Ingrese el modelo de su celular</label>
                <input id="modeloCelular" class="swal2-input">   
                <div class="form-group">
                <label class="col-md-4 control-label" for="selectmultiple">Falla</label>
                <select id="falla" name="selectmultiple" class="form-control" multiple="multiple">
                <option value="Se cayo">Se cayo</option>
                <option value="Se cayo al agua">Se cayo al agua</option>
                <option value="No prende">No prende</option>
                <option value="No carga">No carga</option>
                <option value="La batería descarga rápido">La batería descarga rápido</option>
                <option value="El vidrio esta roto pero funciona">El vidrio esta roto pero funciona</option>
                <option value="Otro">Otro</option>
                </select></div>               
                `,
            showCloseButton: true,
            showCancelButton: true,
            confirmButtonText: "Guardar",
            denyButtonText: `Cancelar`,
            preConfirm: () => {
                return {
                    nombreCliente: document.getElementById("nombreCliente").value,
                    correoCliente: document.getElementById("correoCliente").value,
                    telefonoCliente: document.getElementById("telefonoCliente").value,
                    modeloCelular: document.getElementById("modeloCelular").value,
                    falla: document.getElementById("falla").value,
                };
            }
        });
        if (formValues) {
            let cliente = new Diagnostico(formValues.nombreCliente, formValues.correoCliente, formValues.telefonoCliente, formValues.ModeloCelular, formValues.falla)
            let objDiagnostico = agregarTecnico();
            // .then(data =>{marca.agregarCelular(data);//variableDeLaMismaClase.funcionDeClase(variableGlobal[propiedadEscritaEnOrdenNumerico])
            };
    }

    async function agregarTecnico() {
        console.log("Agregar Técnico");

        const { value: formValues } = await Swal.fire({
            title: "INGRESE DATOS DEL TECNICO",
            icon: "info",
            html: `
                <label class="col-md-4 control-label" for="textinput">Ingrese el Nombre del Tecnico</label>
                <input id="nombreTecnico" class="swal2-input">
                <label class="col-md-4 control-label" for="textinput">Ingrese el Apellido del Tecnico</label>
                <input id="apellidoTecnico" class="swal2-input">
                <label class="col-md-4 control-label" for="textinput">Ingrese el Skill del Tecnico</label>
                <input id="skillTecnico" class="swal2-input">   
                   
                `,
            showCloseButton: true,
            showCancelButton: true,
            confirmButtonText: "Guardar",
            denyButtonText: `Cancelar`,
            preConfirm: () => {
                return {
                    nombreTecnico: document.getElementById("nombreTecnico").value,
                    apellidoTecnico: document.getElementById("apellidoTecnico").value,
                    skill: document.getElementById("skillTecnico").value,
                };
            }
        });
        if (formValues) {
            let tecnico = new Tecnicos(formValues.nombreTecnico, formValues.apellidoTecnico, formValues.skillTecnico)
            return tecnico;
        }
    

    async function agregarCelular() {
        console.log("Ingresando datos del celular");

        const { value: formValues } = await Swal.fire({
            title: "INGRESE SUS DATOS",
            icon: "info",
            html: `
                <label class="col-md-4 control-label" for="textinput">Ingrese La marca del celular</label>
                <input id="marca" class="swal2-input">
                <label class="col-md-4 control-label" for="textinput">Ingrese el modelo del celular</label>
                <input id="modelo" class="swal2-input">
                <label class="col-md-4 control-label" for="textinput">Ingre el IMEI del celular</label>
                <input id="imei" class="swal2-input">   
                `,
            showCloseButton: true,
            showCancelButton: true,
            confirmButtonText: "Guardar",
            denyButtonText: `Cancelar`,
            preConfirm: () => {
                return {
                    marca: document.getElementById("marca").value,
                    modelo: document.getElementById("modelo").value,
                    imei: document.getElementById("imei").value,
                   
                };
            }
        });
        if (formValues) {
            let telefono = new Celulares(formValues.marca, formValues.modelo, formValues.imei)
            return telefono;
        }
    }
}
    return {
        init: function (parametros) {
            console.log(parametros)
            Nombre = parametros.nombre;
            Servicio = parametros.servicio;
            configurar();
            eventos();
        },
    };

}();

// Segundo paso, empezamos a crear las clases que utilizaremos en el programa.
class Celulares {
    constructor(imei, marca, modelo) {

        this.marca = marca;
        this.modelo = modelo;
        this.imei = imei;
        this.arrCelular = [];
        this.habilitado = false;
        this.abono = 0;
        this.autorizacion = "Autorizado"
    }

    // agregarCelular(celular) {
    //     if (this.abono = this.abonoInicial >= costoServicio * 0.5 && this.autorizacion == "Autorizado") {
    //         this.habilitado = true;
    //     }
    //     this.arrCelular.push(celular);
    // }
}

class Diagnostico {
    constructor(cliente, telefono, correo, falla, fecha, sucursal) {
        this.cliente = cliente;
        this.telefono = telefono;
        this.correo = correo;
        this.falla = falla;
        this.fecha = fecha;
        this.sucursal = sucursal;

    }

}

class Tecnicos {
    constructor(nombreTecnico, apellidoTecnico, skill) {
        this.nombreTecnico = nombreTecnico;
        this.apellidoTecnico = apellidoTecnico;
        this.skill = skill;
    }
 
}
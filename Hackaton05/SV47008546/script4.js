const Servicio = function () { //actividad principal del comercio
    let Nombre;
    let Ciudad;
    let arrTelefono = [];
    let arrClientes = [];
    let arrTecnico = [];

    function configurar() {
        console.log('iniciando la configuracion');
        $("#titulo").text(Nombre)
        $("#ciudad").text(Ciudad);
        
    }
    function eventos() {
        console.log('escuchando los eventos');
        $("#registrarClient").on("click", registrarCliente);
        $("#registrarPhone").on("click", registrarTelefono);
        $("registrarTechnical").on("click", registrarTecnico);
    }
    function registrarTelefono() {
        var modelo = prompt('Ingrese el modelo del telefono');
        var marca = prompt('Ingrese la marca del telefono');
        var serie = prompt('Ingrese la serie del telefono a reparar');
        var imei = prompt('Ingrese el imei del telefono a reparar');
        var estado = prompt('Ingrese el estado del telefono');
        var falla = prompt('Ingrese la falla del teelefono');
        var registrarPhone = new telefono(modelo, marca, estado, falla, serie, imei);
        arrTelefono.push(registrarPhone);
        console.log(registrarPhone);
        console.log(arrTelefono);
    }
    function registrarCliente(nombreCliente, last, nroCel, mail, registrar) {
        var nombreCliente = prompt('Ingrese el nombre del cliente');
        var last = prompt('Ingrese el apellido del cliente');
        var nroCel = prompt('Ingrese el nro de celular del cliente');
        var mail = prompt('Ingrese el correo del cliente');
        var abono = prompt('Ingrese la cantidad cancelada en soles');
        var autorizar = prompt('Indique si autoriza la reparacion');
        var registrar = new cliente(nombreCliente, last, nroCel, mail, abono, autorizar)
        arrClientes.push(registrar);
        console.log(registrar);
        console.log(arrClientes);
    }
    function registrarTecnico(){
        var nameTecnico = prompt('Ingrese el nombre del tecnico');
        var lastTecnico = prompt('Ingrese el apellido del tecnico');
        var skillMarca = prompt('Ingrese las Marcas que trabajara el tecnico');
        var diagnostico = prompt ('Ingrese el diagnostico del equipo')
        var registrarTec = new tecnico (nameTecnico, lastTecnico,skillMarca,diagnostico);
        arrTecnico.push(registrarTec);
        console.log(registrarTec);
        console.log(arrTecnico);
    }
    return {
        init: function (parametros) {
            console.log(parametros)
            Nombre = parametros.nombre;
            Ciudad = parametros.ciudad;
            configurar();
            eventos();
        },
    }
}();
class telefono {
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
    registrarCliente(cliente) {
        if (this.serie && this.imei != undefined || null){
            this.habilitado = true
        }
        this.arrClientes.push(cliente);
        this.nroClientes++;
        
        console.log(this.nroClientes);
        console.log(this.habilitado);

    }
}
class cliente {
    constructor(nombreCliente, last, nroCel, mail, abono, autorizar) {
        this.nombreCliente = nombreCliente;
        this.last = last;
        this.nroCel = nroCel;
        this.mail = mail;
        this.abono = abono;
        this.autorizar = autorizar;
    }
    //     if(registrarCliente = null || undefined) {
    //         document.getElementById("demo").innerHTML = 'Los datos fueron ingresados correctamente';
    //     }
}
class tecnico {
    constructor (nameTecnico, lastTecnico, skillMarca, diagnostico){
    this.nameTecnico = nameTecnico;
    this.lastTecnico = lastTecnico; 
    this.skillMarca = skillMarca;
    this.diagnostico = diagnostico;}
}
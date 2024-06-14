class cliente {
    constructor (nombreCliente, last, nroCel, mail, abono, autorizar){
    this.nombreCliente = nombreCliente;
    this.last = last;
    this.nroCel = nroCel;
    this.mail = mail;
    this.abono = abono;
    this.autorizar = autorizar; 
    }
    registrarCliente(nombreCliente, last, nroCel, mail){
        var nombreCliente = prompt('Ingrese el nombre del cliente');
        var last = prompt('Ingrese el apellido del cliente');
        var nroCel = prompt('Ingrese el nro de celular del cliente');
        var mail = prompt('Ingrese el correo del cliente');
    }
    if (registrarCliente = null || undefined){
    document.getElementById("demo").innerHTML='Los datos fueron ingresados correctamente';
} 
}
class telefono {
    constructor (modelo, marca, estado, falla, serie, imei){
        this.modelo = modelo;
        this.marca = marca;
        this.estado = estado;
        this.falla = falla; 
        this.serie = serie;
        this.imei = imei; 
    }
registrarTelefono(){
    var modelo = prompt('Ingrese el modelo del cliente');
    var marca = prompt('Ingrese el modelo del celular');
    var serie = prompt('Ingrese la serie del celular a reparar');
    var imei = prompt('Ingrese el imei del telefono a reparar');

}
}
class tecnico {
    constructor (nameTecnico, lastTecnico, skillMarca, diagnostico){
    this.nameTecnico = nameTecnico;
    this.lastTecnico = lastTecnico; 
    this.skillMarca = skillMarca;
    this.diagnostico = diagnostico;}
    registrarTecnico(){
        var nameTecnico = prompt('Ingrese el nombre del tecnico');
        var lastTecnico = prompt('Ingrese el apellido del tecnico');
        var skillMarca = prompt('Ingrese las Marcas que trabajara el tecnico')
    }
    asignarTecnico(){
        if (this.skillMarca == this.marca){
            document.getElementById("demo").innerHTML = `El tecnico asignado es ${this.nameTecnico, this.lastTecnico}`; // back tics (comillas invertidas) Alt+96

        }
    }
}
class repuestos extends telefono{ // polimorfismo permitira hacer la misma funcionalidad del padre pero con un resultado diferente.
    constructor (modelo, marca, estado, falla, serie, imei,pantalla, bateria, camara, protector, placa, software){ // Se coloca las categorias de la clase padre y las categorias de la clase hijo
      super(modelo, marca, estado, falla, serie, imei); // Palabra magica "super", sirve para cargar los datos de la clase hijo en la clase padre
        this.pantalla = pantalla;
        this.bateria = bateria; 
        this.camara = camara;
        this.protector = protector; 
        this.software = software;
        this.placa = placa;
}} //los cambios que se ejecuten en el padre afectaran a los hijos, pero los cambios que se ejecuten en los hijos no afectaran al padre
class autorizacion {
    constructor (autorizado, abono){
        this.autorizado = autorizado;
        this.abono = abono;
}}

     // let objTelefono = new telefono('Iphone14', 'Apple', 'Inoperativo', 'No enciende', 3333, 6666);
        // arrTelefono.push(objTelefono);
        // let objTelefono2 = new telefono('Iphone13', 'Apple', 'Inoperativo', 'Pantalla Rota', 4444, 5555);
        // arrTelefono.push(objTelefono2);
        // let objTelefono3 = new telefono('Samsung', 'A3000', 'Inoperativo', 'No enciende', 2222, 1111);
        // arrTelefono.push(objTelefono3);
        // console.log(arrTelefono);
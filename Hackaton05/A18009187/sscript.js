// Se necesita crear un sistema que maneje las reparaciones de celulares en un local con varias sucursales
// Tomar en cuenta los siguientes casos de uso:
//- El telefono ingresado debe tener numero de serie e IMEI que no esten reportados para acceder al servicio
//- Un telefono primero debe pasar por una primera revision y se debe guardar el primer diagnostico
//- Se debe tener la autorizacion escrita del usuario y el abono del 50% de la reparacion para que acceda al servicio
//- Los tecnicos pueden tener uno o varios skills que se adecuen a la marca de telefono que se necesita acceder al servicio
//- Los repuestos se agregaran a la reparacion de telefono
//- Se debe mostrar el estado del equipo en sus diferentes estaciones de trabajo //

class Telefono {
    constructor(numeroSerie, imei,marca) {
        this.numeroSerie = numeroSerie;
        this.imei = imei;
        this.marca=marca;
        this.reportado = false;
        this.diagnostico= null;
        this.autotizacion=false;
        this.abono= 0;
    }
    verificarReporte (){
        return this.reportado;
    }
}

class Reparacion {
    constructor(telefono,tecnico, repuesto){
        this.telefono=telefono;
        this.tecnico=tecnico;
        this.repuesto=repuesto;
        this.estado='En espera de autorización'
    }
    autotizarReparacion(){
        if (this.telefono.autotizacion && this.telefono.abono ===this.calcularAbonInicial){
            this.estado= 'En reparacion'
        }else{
            console.log('La autorizacion y/o abono son diferentes. ')
        }
    }
    calcularAbonInicial (){
        return 0.5*this.tecnico.calcularReparación(this.telefono)
    }
}
class Tecnico {
    constructor(nombre,skill){
        this.nombre = nombre;
        this.skill=skill;
    }
    puedeReparar (marca){
        return this.skill.includes(marca)
    }
    calcularReparación(telefono){
        let costoBase = 100;
        let costoMarca =telefono.marca === 'iphone'? 50:0;
        return costoBase*costoMarca

    }
}

const telefono1 = new Telefono ('2222','imei23','Samsung')

const tecnico1 = new Tecnico ('Pedro', ['Samsung', 'Oppo'])

if (tecnico1.puedeReparar(telefono1.marca)){
    const respuestos =['pantalla', 'flex-audio']
    const reparacion1 = new Reparacion(telefono1,tecnico1,respuestos)
    telefono1.autotizacion = true;
    tecnico1.calcularReparación(telefono1)
    reparacion1.autotizarReparacion();
    console.log(reparacion1);
}
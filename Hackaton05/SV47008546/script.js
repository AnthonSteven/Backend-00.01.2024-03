
class Telefono {

    constructor(numeroSerie, imei, marca) {
        this.numeroSerie = numeroSerie; // definimos que no este reportado
        this.imei = imei; // definimos que no este reportado
        this.marca = marca;
        this.reportado = false;
        this.diagnostico = null;
        this.autorizacion = false;
        this.abono = 0;
    }

    verificarReporte() {
        return this.reportado;
    }
}

class Reparacion {
    constructor(telefono, tecnico, repuesto) { // podrias agregar un diagnostico
        this.telefono = telefono;
        this.tecnico = tecnico;
        this.repuesto = repuesto;
        this.estado = 'En espera de autorizacion' // autoriza: escrita y abono del 50%
    }

    autorizarReparacion() { // primera parte para autorizar
        // console.log(this.telefono.autorizacion);
        // console.log(this.telefono.abono);
        // console.log(this.calcularAbonoInicial(telefono))
        if (this.telefono.autorizacion && this.telefono.abono >= this.calcularAbonoInicial()) {
            this.estado = 'En Reparación'
        } else {
            console.log('La autorizacion y/o abono son diferentes.')
        }
    }
    calcularAbonoInicial() {
        return 0.5 * this.tecnico.calcularReparacion(this.telefono);  // segunda parte para autorizar
    }
}

// let marca = ['Samsung','Oppo', 'Huawei' ]

class Tecnico {
    constructor(nombre, skills) {
        this.nombre = nombre;
        this.skills = skills;
    }
    puedeReparar(marca) {
        //console.log(marca)
        return this.skills.includes(marca);
        
    }
    calcularReparacion(telefono) { //El costo depende de los daños que tiene el equipo.
        let costoBase = 100;
        let costoMarca = telefono.marca === 'Samsung' ? 50 : 0;
        // expresion "operador ternario --> ? --> valorVerdadero: valorFalso"
     //console.log('calc', (costoBase * costoMarca))
        return costoBase + costoMarca
    }
    
}
const telefono1 = new Telefono('2222', 'imei123', 'Samsung')
// console.log(telefono1)

const tecnico1 = new Tecnico('Pedro', ['Samsung', 'Oppo'])
if (tecnico1.puedeReparar(telefono1.marca)) {
    const repuestos = ['pantalla', 'flex-audio']
    const reparacion1 = new Reparacion(telefono1, tecnico1, repuestos)
    
    telefono1.abono = 75; 
    telefono1.autorizacion = true;
    tecnico1.calcularReparacion(telefono1)
    reparacion1.autorizarReparacion();
   //console.log(reparacion1);
}

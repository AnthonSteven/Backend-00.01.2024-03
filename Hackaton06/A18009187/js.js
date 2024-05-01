class Telefono {
    constructor(numeroSerie, imei, marca) {
        this.numeroSerie = numeroSerie;
        this.imei = imei;
        this.marca = marca;
        this.reportado = false;
        this.diagnostico = null;
        this.autorizacion = false;  // Corrección de 'autotizacion' a 'autorizacion'
        this.abono = 0;
    }

    verificarReporte() {
        return this.reportado;
    }

    realizarRevision(diagnosticoInicial) {
        this.diagnostico = diagnosticoInicial;
    }
}

class Tecnico {
    constructor(nombre, skills) {
        this.nombre = nombre;
        this.skills = skills;
    }

    puedeReparar(marca) {
        return this.skills.includes(marca);
    }

    calcularReparacion(telefono) {
        let costoBase = 100;
        let costoMarca = telefono.marca === 'iphone' ? 50 : 0;
        return costoBase + costoMarca;
    }
}

class Reparacion {
    constructor(telefono, tecnico, repuestos) {
        this.telefono = telefono;
        this.tecnico = tecnico;
        this.repuestos = repuestos;
        this.estado = 'En espera de diagnóstico inicial';
    }

    realizarRevisionInicial(diagnostico) {
        this.telefono.realizarRevision(diagnostico);
        this.estado = 'En espera de autorización y abono';
    }

    autorizarReparacion(abono, autorizacionEscrita) {
        if (autorizacionEscrita) {
            this.telefono.autorizacion = true;
        }
        if (this.telefono.autorizacion && abono === this.calcularAbonoInicial()) {
            this.telefono.abono = abono;
            this.estado = 'En reparacion';
        } else {
            console.log('Autorización escrita y/o abono insuficiente.');
        }
    }

    calcularAbonoInicial() {
        return 0.5 * this.tecnico.calcularReparacion(this.telefono);
    }

    finalizarReparacion() {
        this.estado = 'Reparacion completa';
    }
}

// Ejemplo de uso:
const telefono1 = new Telefono('123456789', 'imei123456789', 'Samsung');
const tecnico1 = new Tecnico('Pedro', ['Samsung', 'Oppo']);

if (!telefono1.verificarReporte() && tecnico1.puedeReparar(telefono1.marca)) {
    const repuestos = ['pantalla', 'batería'];
    const reparacion1 = new Reparacion(telefono1, tecnico1, repuestos);
    reparacion1.realizarRevisionInicial('Pantalla rota, necesita reemplazo.');
    console.log(reparacion1.estado); // Mostrar el estado actual

    // Proceso de autorización y abono
    reparacion1.autorizarReparacion(50, true); // Abono y autorización escrita
    console.log(reparacion1.estado); // Mostrar el estado actual
}

const telefonoStr = JSON.stringify(telefono1);
const tecnicoStr = JSON.stringify(tecnico1);
localStorage.setItem('telefono', telefonoStr);
localStorage.setItem('tecnico', tecnicoStr);
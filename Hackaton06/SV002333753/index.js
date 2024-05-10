class Telefono {
    constructor(numeroDeSerie, marca, imei) {
        this.numeroDeSerie = numeroDeSerie;
        this.marca = marca;
        this.imei = imei;
        this.reportado = false;
        this.descripcionDanio = null;
    }

    validarIMEI() {
        const imeiRegExp = /^\d{15}$/;
        return imeiRegExp.test(this.imei);
    }

    verificarSiEstaReportado() {
        this.reportado = telefonosReportados.includes(this.imei);
        return this.reportado;
    }

    actualizarInformacion(descripcion) {
        this.descripcionDanio = descripcion;
        return {
            descripcionDanio: this.descripcionDanio,
            marca: this.marca
        };
    }
}

class Usuario {
    constructor(nombre) {
        this.nombre = nombre;
        this.autorizado = false;
        this.abonado = 0; 
    }

    autorizarYAbonar(abono) {
        if (abono >= 50) {
            this.abonado = abono;
            this.autorizado = true;
            return true;
        }
        return false;
    }

    puedeIniciarRevision() {
        return this.autorizado && this.abonado >= 50;
    }
}

class Tecnico {
    constructor(nombre) {
        this.nombre = nombre;
        this.skills = [];
    }

    agregarSkill(skill) {
        this.skills.push(skill);
    }

    puedeReparar(marca) {
        return this.skills.includes(marca);
    }
}

class Reparacion {
    constructor(telefono, tecnico, usuario) {
        this.telefono = telefono;
        this.tecnico = tecnico;
        this.usuario = usuario;
        this.repuestos = [];
        this.estado = 'pendiente';
    }

    agregarRepuesto(repuesto) {
        this.repuestos.push(repuesto);
    }

    iniciarReparacion() {
        if (!this.telefono.verificarSiEstaReportado() && this.telefono.validarIMEI() && this.usuario.puedeIniciarRevision()) {
            if (this.tecnico.puedeReparar(this.telefono.marca)) {
                this.estado = 'en progreso';
                return true;
            }
        }
        return false;
    }

    finalizarReparacion() {
        this.estado = 'completado';
        this.repuestos.forEach(repuesto => repuesto.actualizarEstado('reparado'));
    }
}

class Repuesto {
    constructor(nombre) {
        this.nombre = nombre;
        this.estado = 'en espera'; 
    }

    actualizarEstado(nuevoEstado) {
        this.estado = nuevoEstado;
    }
}

// Datos de ejemplo
const telefonosReportados = ['987654321012345', '123456789012345'];

let tecnico1 = new Tecnico('Juan');
tecnico1.agregarSkill('Samsung');
tecnico1.agregarSkill('Apple');

let usuario1 = new Usuario('Pedro');
usuario1.autorizarYAbonar(50);

let telefono1 = new Telefono('123456', 'Apple', '543216789012345');
let reparacion1 = new Reparacion(telefono1, tecnico1, usuario1);


if (reparacion1.iniciarReparacion()) {
    console.log('Reparación iniciada');
    reparacion1.finalizarReparacion();
    console.log('Reparación finalizada');
} else {
    console.log('No se pudo iniciar la reparación');
}

document.getElementById('repairForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
    console.log("Formulario enviado");
  
    const numeroDeSerie = document.getElementById('serie').value;
    const marca = document.getElementById('marca').value;
    const imei = document.getElementById('imei').value;
    const nombreUsuario = document.getElementById('nombreUsuario').value;
    const abono = parseFloat(document.getElementById('abono').value);  
  
    let telefono = new Telefono(numeroDeSerie, marca, imei);
    let usuario = new Usuario(nombreUsuario);
    usuario.autorizarYAbonar(abono);
    
    
    let tecnicoAdecuado = null;
    if (tecnico1.puedeReparar(marca)) {
        tecnicoAdecuado = tecnico1;
    }

    
    let reparacion = new Reparacion(telefono, tecnicoAdecuado, usuario);
    if (reparacion.iniciarReparacion()) {
        document.getElementById('resultados').innerHTML = `
            <p>Reparación registrada con éxito. Detalles:</p>
            <ul>
                <li>Técnico asignado: ${tecnicoAdecuado.nombre}</li>
                <li>Marca del teléfono: ${marca}</li>
                <li>IMEI: ${imei}</li>
                <li>Estado de la reparación: ${reparacion.estado}</li>
            </ul>
        `;
    } else {
        document.getElementById('resultados').innerHTML = `<p>Error: No se pudo iniciar la reparación. Verifique que no esté reportado y que el IMEI sea válido, y que haya un técnico disponible para la marca.</p>`;
    }
});

function guardarTecnicos(tecnico) {
    let tecnicos = JSON.parse(localStorage.getItem('tecnicos')) || [];
    tecnicos.push(tecnico);
    localStorage.setItem('tecnicos', JSON.stringify(tecnicos));
}


function cargarTecnicos() {
    let tecnicos = JSON.parse(localStorage.getItem('tecnicos')) || [];
    return tecnicos.map(t => new Tecnico(t.nombre, t.skills));
}


guardarTecnicos({nombre: 'Juan', skills: ['Samsung', 'Apple']});
let tecnicosRecuperados = cargarTecnicos();
tecnicosRecuperados.forEach(t => console.log(t.nombre));


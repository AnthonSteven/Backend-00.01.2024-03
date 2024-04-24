// Definición de la clase Telefono
class Telefono {
    constructor(imei) {
        this.imei = imei;
        this.validado = this.validarIMEI();
        this.diagnostico = {};
        this.autorizado = false;
        this.reparaciones = [];
        this.costoTotal = 0;
    }

    // Método para validar el número de IMEI
    validarIMEI() {
        return this.imei.length === 12;
    }

    // Método para guardar el diagnóstico inicial del teléfono
    guardarDiagnostico(diagnostico) {
        this.diagnostico = diagnostico;
    }

    // Método para verificar la autorización del usuario
    verificarAutorizacion() {
        return confirm('¿Acepta los términos y condiciones para la reparación?');
    }

    // Método para realizar una reparación y agregarla a la lista
    realizarReparacion(reparacion) {
        this.reparaciones.push(reparacion);
        this.costoTotal += reparacion.costo;
    }
}

// Definición de la clase Tecnico
class Tecnico {
    constructor(nombre, marcasEspecializadas, local, costo) {
        this.nombre = nombre;
        this.marcasEspecializadas = marcasEspecializadas;
        this.local = local;
        this.costo = costo;
    }

    // Método para verificar si el técnico puede reparar un teléfono según la marca
    puedeReparar(telefono) {
        return this.marcasEspecializadas.includes(telefono.diagnostico.marca.toLowerCase());
    }
}

// Función para iniciar la reparación del teléfono
function iniciarReparacion() {
    const imei = document.getElementById('imeiInput').value;
    const telefono = new Telefono(imei);

    if (!telefono.validado) {
        alert('IMEI no válido. Debe tener exactamente 12 dígitos.');
        return;
    }

    const diagnostico = obtenerDiagnostico();
    telefono.guardarDiagnostico(diagnostico);

    if (telefono.verificarAutorizacion()) {
        mostrarEstadoInicial(telefono.diagnostico);
        const tecnico = asignarTecnico(telefono);
        realizarReparaciones(telefono, tecnico);
    }
}

// Función para obtener el diagnóstico del teléfono desde el formulario
function obtenerDiagnostico() {
    const estado = prompt('¿El teléfono es bueno o malo?');
    const enciende = prompt('¿Enciende? (Sí/No)').toLowerCase() === 'sí';
    const marca = prompt('Marca del teléfono:');
    const pantalla = prompt('Estado de la pantalla (bueno/malo):');
    const caseEstado = prompt('Estado del case (bueno/malo):');
    const camara = prompt('Estado de la cámara (funciona/no funciona):');
    const bateria = prompt('Estado de la batería (bueno/malo):');
    const porcentajeBateria = parseInt(prompt('Porcentaje de la batería:'));
    const año = parseInt(prompt('Año del teléfono:'));
    const tipo = prompt('¿Es un teléfono inteligente? (Sí/No)').toLowerCase() === 'sí';

    return {
        estado,
        enciende,
        marca,
        pantalla,
        caseEstado,
        camara,
        bateria,
        porcentajeBateria,
        año,
        tipo
    };
}

// Función para mostrar el estado inicial del teléfono
function mostrarEstadoInicial(diagnostico) {
    const estadoInicialList = document.getElementById('estadoInicialList');
    estadoInicialList.innerHTML = '';
    for (const key in diagnostico) {
        estadoInicialList.innerHTML += `<li><strong>${key}:</strong> ${diagnostico[key]}</li>`;
    }
    document.getElementById('estadoInicial').style.display = 'block';
}

// Función para asignar un técnico al teléfono según la marca
function asignarTecnico(telefono) {
    const tecnicos = [
        new Tecnico('Técnico 1', ['iphone'], 'Lima Centro', 500),
        new Tecnico('Técnico 2', ['huawei', 'xiaomi'], 'Miraflores', 300),
        new Tecnico('Técnico 3', ['nokia', 'motorola', 'samsung'], 'San Isidro', 400),
        new Tecnico('Técnico 4', [], 'Surco', 200)
    ];

    for (const tecnico of tecnicos) {
        if (tecnico.puedeReparar(telefono)) {
            return tecnico;
        }
    }

    return null;
}

// Función para realizar las reparaciones necesarias
function realizarReparaciones(telefono, tecnico) {
    if (tecnico) {
        const reparaciones = [];

        if (telefono.diagnostico.estado === 'malo') {
            reparaciones.push({ nombre: 'Cambio de repuesto', costo: 200 });
        }

        if (telefono.diagnostico.pantalla === 'malo') {
            reparaciones.push({ nombre: 'Reparación de pantalla', costo: 100 });
        }

        if (telefono.diagnostico.caseEstado === 'malo') {
            reparaciones.push({ nombre: 'Reparación de case', costo: 100 });
        }

        if (telefono.diagnostico.camara === 'no funciona') {
            reparaciones.push({ nombre: 'Reparación de cámara', costo: 100 });
        }

        if (telefono.diagnostico.porcentajeBateria < 80) {
            reparaciones.push({ nombre: 'Cambio de batería', costo: 100 });
        }

        reparaciones.forEach(reparacion => telefono.realizarReparacion(reparacion));

        mostrarReparaciones(telefono);
    } else {
        alert('No hay técnico disponible para reparar este teléfono en la sucursal.');
    }
}

// Función para mostrar las reparaciones realizadas y el costo total
function mostrarReparaciones(telefono) {
    const reparacionesList = document.getElementById('reparacionesList');
    reparacionesList.innerHTML = '';
    telefono.reparaciones.forEach(reparacion => {
        reparacionesList.innerHTML += `<li>${reparacion.nombre} - S/ ${reparacion.costo}</li>`;
    });

    const costoTotal = document.getElementById('costoTotal');
    costoTotal.textContent = `Costo Total: S/ ${telefono.costoTotal}`;

    document.getElementById('reparacionesRealizadas').style.display = 'block';
}

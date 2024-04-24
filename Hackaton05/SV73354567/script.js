class ReparacionCelular {
    constructor(params) {
        this.vSistema = params.vSistema;
        this.vSede = params.vSede;
        this.tecnicos = [];
        this.registrosPendientes = [];
    }

    configurar() {
        document.getElementById("sistema").textContent = this.vSistema;
        document.getElementById("sede").textContent = this.vSede;
        this.crearTecnicos();
        this.registrarEventos();
    }

    crearTecnicos() {
        const t1 = new Tecnico("TC01", "Carlos Perez", 1, "XIAOMI");
        const t2 = new Tecnico("TC02", "Jose Alva", 2, "LG");
        const t3 = new Tecnico("TC03", "Manuel Pablo", 3, "APPLE");
        this.tecnicos.push(t1, t2, t3);
    }

    registrarEventos() {
        document.getElementById("formCelular").addEventListener("submit", this.ingresarCelular.bind(this));
    }

    ingresarCelular(event) {
        event.preventDefault();

        const nombreCliente = document.getElementById("nombreCliente").value;
        const numeroSerie = document.getElementById("numeroSerie").value;
        const imei = document.getElementById("imei").value;
        const diagnostico = document.getElementById("diagnostico").value;
        const total = parseFloat(document.getElementById("total").value);
        const marca = document.getElementById("marca").value;
        const repuestos = document.getElementById("repuestos").value;

        const celular = new Telefono(numeroSerie, imei);
        celular.nombreCliente = nombreCliente;
        celular.rDiagnostico(diagnostico);
        const mitad = celular.calcularMitad(total);

        const tecnico = this.buscarTecnicoPorMarca(marca);
        if (tecnico) {
            celular.asignarTecnico(tecnico);
            celular.agregarRepuestos(repuestos);
            this.registrosPendientes.push(celular);
            this.mostrarDetalleServicio(celular, mitad);
            alert("Registro Exitoso!!!")
            return limpiarCampos();
        } else {
            alert("No se encontró técnico para esa marca de celular.");
        }
    }

    buscarTecnicoPorMarca(marca) {
        return this.tecnicos.find(tecnico => tecnico.vMarcaTelefono === marca);
    }

    mostrarDetalleServicio(celular) {
        const listaCelulares = document.getElementById("listaCelulares");
        const row = listaCelulares.insertRow();

        row.insertCell().textContent = celular.nombreCliente;
        row.insertCell().textContent = celular.tecnico.vMarcaTelefono;
        row.insertCell().textContent = celular.numeroSerie;
        row.insertCell().textContent = celular.imei;
        row.insertCell().textContent = celular.diagnostico;
        row.insertCell().textContent = celular.total;
        row.insertCell().textContent = celular.tecnico.vNombres;
        row.insertCell().textContent = celular.repuestos;

        const estadoCell = row.insertCell();
        const autorizarBtn = document.createElement("button");
        autorizarBtn.textContent = "Autorizar y abonar el 50%";
        autorizarBtn.classList.add("btn", "btn-primary", "btn-sm");
        autorizarBtn.addEventListener("click", () => this.autorizarAbonar(celular, autorizarBtn));
        estadoCell.appendChild(autorizarBtn);


        document.getElementById("detalleServicio").style.display = "block";
    }


    autorizarAbonar(celular, autorizarBtn) {
        autorizarBtn.textContent = "Autorizado y Abonado";
        autorizarBtn.disabled = true; // Deshabilitar el botón después de autorizar

        const listaPendientes = document.getElementById("listaPendientes");
        const row = listaPendientes.insertRow();

        row.insertCell().textContent = celular.nombreCliente;
        row.insertCell().textContent = celular.tecnico.vMarcaTelefono;
        row.insertCell().textContent = celular.numeroSerie;
        row.insertCell().textContent = celular.imei;
        row.insertCell().textContent = celular.diagnostico;
        row.insertCell().textContent = celular.total;
        row.insertCell().textContent = celular.tecnico.vNombres;
        row.insertCell().textContent = celular.repuestos;


        const estadoCell = row.insertCell();
        const repararBtn = document.createElement("button");
        repararBtn.textContent = "Listo para Reparacion";
        repararBtn.classList.add("btn", "btn-primary", "btn-sm");
        repararBtn.addEventListener("click", () => this.repararCelular(celular, repararBtn));
        estadoCell.appendChild(repararBtn);

        document.getElementById("tablaPendientes").style.display = "block";
    }

    repararCelular(celular, repararBtn) {
        repararBtn.textContent = "Reparado";
        repararBtn.disabled = true; // Deshabilitar el botón después de Reparar

        const listaReparados = document.getElementById("listaReparados");
        const row = listaReparados.insertRow();

        row.insertCell().textContent = celular.nombreCliente;
        row.insertCell().textContent = celular.tecnico.vMarcaTelefono;
        row.insertCell().textContent = celular.numeroSerie;
        row.insertCell().textContent = celular.imei;
        row.insertCell().textContent = celular.diagnostico;
        row.insertCell().textContent = celular.total;
        row.insertCell().textContent = celular.tecnico.vNombres;
        row.insertCell().textContent = celular.repuestos;

        const estadoCell = row.insertCell();
        const entregarBtn = document.createElement("button");
        entregarBtn.textContent = "Listo para Entregar";
        entregarBtn.classList.add("btn", "btn-primary", "btn-sm");
        entregarBtn.addEventListener("click", () => this.entregarCelular(celular, entregarBtn));
        estadoCell.appendChild(entregarBtn);

        document.getElementById("tablaReparados").style.display = "block";
    }

    entregarCelular(celular, repararBtn) {
        repararBtn.textContent = "Entregado a Cliente";
        alert("Celular Entregado")
        repararBtn.disabled = true; // Deshabilitar el botón después de Reparar







    }
}
class Telefono {
    constructor(numeroSerie, imei) {
        this.numeroSerie = numeroSerie;
        this.imei = imei;
        this.diagnostico = '';
        this.total = 0;
        this.mitad = 0;
        this.tecnico = null;
        this.repuestos = '';
    }

    rDiagnostico(diagnostico) {
        this.diagnostico = diagnostico;
    }

    calcularMitad(total) {
        this.total = total;
        this.mitad = total / 2;
        return this.mitad;
    }

    asignarTecnico(tecnico) {
        this.tecnico = tecnico;
    }

    agregarRepuestos(repuestos) {
        this.repuestos = repuestos;
    }
}

class Tecnico {
    constructor(tCodigo, vNombres, iCodTel, vMarcaTelefono) {
        this.tCodigo = tCodigo;
        this.vNombres = vNombres;
        this.iCodTel = iCodTel;
        this.vMarcaTelefono = vMarcaTelefono;
    }
}

const reparacionCelular = new ReparacionCelular({
    vSistema: "Hackaton 05 - Servicio de Reparacion de Celulares",
    vSede: "Kevin Carlos Tenazoa Cuba - BackEnd JavaScript"
});

document.addEventListener("DOMContentLoaded", function () {
    reparacionCelular.configurar();
});

function limpiarCampos() {
    document.getElementById("formCelular").reset();
}

function mostrarDetalles() {
    document.getElementById("detalleServicio").style.display = "block";
    document.getElementById("tablaPendientes").style.display = "block";
    document.getElementById("tablaReparados").style.display = "block";
}


function ocultarDetalles() {
    document.getElementById("detalleServicio").style.display = "none";
    document.getElementById("tablaPendientes").style.display = "none";
    document.getElementById("tablaReparados").style.display = "none";
}

class ReparacionCelular {
    constructor(params) {
        this.vSistema = params.vSistema;
        this.vSede = params.vSede;
        this.tecnicos = [];
        this.registrosPendientes = [];
        this.registros2 = [];
        this.reparado = [];
    }

    cargarRegistros() {
        const registrosPendientes = localStorage.getItem("registrosPendientes");
        if (registrosPendientes) {
            this.registrosPendientes = JSON.parse(registrosPendientes);
            this.registrosPendientes.forEach(celular => {
                this.mostrarDetalleServicio(celular);
            });
        }

        const registros2 = localStorage.getItem("registros2");
        if (registros2) {
            this.registros2 = JSON.parse(registros2);
            this.registros2.forEach(celular => {
                this.mostrarEnTablaPendientes(celular);
            });
        }

        const reparado = localStorage.getItem("reparado");
        if (reparado) {
            this.reparado = JSON.parse(reparado);
            this.reparado.forEach(celular => {
                this.mostrarEnTablaReparados(celular);
            });
        }





    }

    guardarRegistros() {
        localStorage.setItem("registrosPendientes", JSON.stringify(this.registrosPendientes));
    }

    guardarRegistros1() {
        localStorage.setItem("registros2", JSON.stringify(this.registros2));
    }

    guardarRegistros2() {
        localStorage.setItem("reparado", JSON.stringify(this.reparado));
    }

    mostrarEnTablaPendientes(celular) {
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
        
        
        repararBtn.addEventListener("click", () => {
            this.repararCelular(celular, repararBtn);
            // Guardar estado del botón en localStorage
            
            localStorage.setItem(`boton_reparar_${celular.numeroSerie}`, "disabled");
            
        });
        // Verificar y aplicar estado guardado del botón
    const estadoGuardado = localStorage.getItem(`boton_reparar_${celular.numeroSerie}`);
    if (estadoGuardado === "disabled") {
        repararBtn.disabled = true;
        repararBtn.textContent = "Reparado";
    }
        estadoCell.appendChild(repararBtn);

        document.getElementById("tablaPendientes").style.display = "block";
        this.guardarRegistros1
    }

    autorizarAbonar(celular, autorizarBtn) {
        autorizarBtn.textContent = "Autorizado y Abonado";
        autorizarBtn.disabled = true; // Deshabilitar el botón después de autorizar
        

        this.registros2.push(celular);
        this.guardarRegistros1();
        this.mostrarEnTablaPendientes(celular);
    }

    repararCelular(celular, repararBtn) {
        repararBtn.textContent = "Reparado";
        repararBtn.disabled = true; // Deshabilitar el botón después de Reparar

        this.reparado.push(celular);
        this.guardarRegistros2();
        this.mostrarEnTablaReparados(celular);

       
    }

    mostrarEnTablaReparados(celular) {
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

        entregarBtn.addEventListener("click", () => {
            this.entregarCelular(celular, entregarBtn);
            // Guardar estado del botón en localStorage
            localStorage.setItem(`boton_entregar_${celular.numeroSerie}`, "disabled");
        });
        // Verificar y aplicar estado guardado del botón
        const estadoGuardado = localStorage.getItem(`boton_entregar_${celular.numeroSerie}`);
        if (estadoGuardado === "disabled") {
            entregarBtn.disabled = true;
            entregarBtn.textContent = "Entregado a Cliente";
            
        }
        estadoCell.appendChild(entregarBtn);

        
        document.getElementById("tablaReparados").style.display = "block";
        this.guardarRegistros2(); // Guardar registros después de insertar en la tabla.
        
    }

    entregarCelular(celular, entregarBtn) {
        entregarBtn.textContent = "Entregado a Cliente";
        alert("Celular Entregado")
        entregarBtn.disabled = true; // Deshabilitar el botón después de Reparar
        
    }

    configurar() {
        document.getElementById("sistema").textContent = this.vSistema;
        document.getElementById("sede").textContent = this.vSede;
        this.crearTecnicos();
        this.registrarEventos();
        this.cargarRegistros();
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
            limpiarCampos();
        } else {
            alert("No se encontró técnico para esa marca de celular.");
        }
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

        /*autorizarBtn.addEventListener("click", () => this.autorizarAbonar(celular, autorizarBtn));
        estadoCell.appendChild(autorizarBtn);*/

        autorizarBtn.addEventListener("click", () => {
            this.autorizarAbonar(celular, autorizarBtn);
            // Guardar estado del botón en localStorage
            localStorage.setItem(`boton_autorizar_${celular.numeroSerie}`, "disabled");
        });
        // Verificar y aplicar estado guardado del botón
        const estadoGuardado = localStorage.getItem(`boton_autorizar_${celular.numeroSerie}`);
        if (estadoGuardado === "disabled") {
            autorizarBtn.disabled = true;
            autorizarBtn.textContent = "Autorizado y Abonado";
            
        }
        estadoCell.appendChild(autorizarBtn);



        this.guardarRegistros(); // Guardar registros después de insertar en la tabla.

        document.getElementById("detalleServicio").style.display = "block";
    }

    buscarTecnicoPorMarca(marca) {
        return this.tecnicos.find(tecnico => tecnico.vMarcaTelefono === marca);
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
    vSistema: "Hackaton 06 - Servicio de Reparacion de Celulares",
    vSede: "Kevin Carlos Tenazoa Cuba - WebStorage BackEnd JavaScript"
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
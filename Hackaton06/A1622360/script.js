document.addEventListener("DOMContentLoaded", function(e) {
    loadSelectTecnicos();
    loadSelectCelulares();
    llenarTabla();
});
class Telefono{
    constructor(numeroTelefono, imei, marca, modelo, estado = "En Revisión", diagnostico = "") {
        this.numeroTelefono = numeroTelefono;
        this.imei = imei;
        this.marca = marca;
        this.modelo = modelo;
        this.estado = estado;
        this.diagnostico = diagnostico;
    }

    realizarRevision(tecnico,diagnostico){
        const revision = new Revision(tecnico);
        revision.realizarDiagnostico(this,diagnostico);
    }

    static listar(){
        return localStorage.getItem('celulares')!== null ? JSON.parse(localStorage.getItem('celulares')) : [];
    }
}
class Cliente {
    constructor(nombre, autorizacion, abono,numeroTelefono) {
      this.nombre = nombre;
      this.autorizacion = autorizacion;
      this.abono = abono
      this.numeroTelefono = numeroTelefono
    }
    static listar(){
        return localStorage.getItem('clientes') !== null ? JSON.parse(localStorage.getItem('clientes')):[];
    }
  }
  class Revision {
    constructor(tecnico){
        this.fecha = Date.now();
        this.tecnico = tecnico;
        this.telefono = null;
        this.diagnostico = "";
        this.primeraRevision = true;
    }
    
    realizarDiagnostico(telefono, diagnostico){
        const esPrimeraRevision = Telefono.listar().length > 0 && !Telefono.listar().find(t => t.numeroTelefono === telefono.numeroTelefono);
        this.telefono = telefono;
        this.diagnostico = diagnostico;
        this.primeraRevision = esPrimeraRevision;
        this.estado = esPrimeraRevision ? 'Reportado' : 'En revisión';
    }
    
    static listar(){
        return localStorage.getItem('revisiones') !== null ? JSON.parse(localStorage.getItem('revisiones')) : [];
    }
}
class Tecnico {
    constructor(nombre, skills) {
        this.nombre = nombre;
        this.skills = skills;
    }
    static listar(){
        return localStorage.getItem('tecnicos')!== null ? JSON.parse(localStorage.getItem('tecnicos')) : [];
    }
}
class Reparacion{
    constructor(numeroTelefono,estacion,repuestos){
        this.numeroTelefono = numeroTelefono;
        this.estacion = estacion;
        this.repuestos = repuestos;
    }
    static listar(){
        return localStorage.getItem('reparaciones') !== null ? JSON.parse(localStorage.getItem('reparaciones')):[];
    }
}
let currentArraySkills =[];

function loadSelectCelulares() {
    const selectTelefonos= document.getElementById('revisionTelefono');
    
    selectTelefonos.innerHTML = Telefono.listar().length>0 ? `<option value=''>--------------</option>`+Telefono.listar().map(e=>`<option value="${e.imei}"> ${e.numeroTelefono} </option>`).join('') : "<option value=''>No hay tecnicos registrados</option>";
    
}
function loadSelectTecnicos(){
    const selectTecnicos = document.getElementById('revisionTecnico');
    
    selectTecnicos.innerHTML = Tecnico.listar().length>0 ? `<option value=''>--------------</option>`+Tecnico.listar().map(e=>`<option value="${e.nombre}"> ${e.nombre} </option>`).join('') : "<option value=''>No hay tecnicos registrados</option>";
    
}
function loadSkillsByTecnico(event){
    let tecnicoSeleccionado =  Tecnico.listar().find(x=>x.nombre === event.target.value);
    const divSkills = document.getElementById('skillsTecnicoSeleccionado');
    if(tecnicoSeleccionado !== undefined){
        divSkills.innerHTML = tecnicoSeleccionado.skills.length>0 ? tecnicoSeleccionado.skills.map(e=>`<li> ${e} </li>`).join('') : "";
    }
    else{
        divSkills.innerHTML ="";
    }
}
function loadPhoneInfo(event) {
let imei = event.target.value;
const outputDiv = document.getElementById('outputTelefono');    
phone = localStorage.getItem('celulares') !== null ? JSON.parse(localStorage.getItem('celulares')).find(ph=> ph.imei === imei) : null;
if(phone !== undefined){
    outputDiv.innerHTML = "";
    phoneInfo = `
            <p><strong>Número de telefono:</strong> ${phone.numeroTelefono} </p>
            <p><strong>IMEI:</strong>  ${phone.imei} </p>
            <p><strong>Marca:</strong>  ${phone.marca} </p>
            <p><strong>Modelo:</strong>  ${phone.modelo} </p>
            <p><strong>Estado:</strong>  ${phone.estado} </p>
    `;
    outputDiv.innerHTML += phoneInfo;
    document.getElementById('outputTelefono').style.display = 'block';
}
else{
    document.getElementById('outputTelefono').style.display = 'none';
}
}

function submitPhoneForm() {
    try {
        let phoneNumber = document.getElementById('phoneNumber').value;
        let imei = document.getElementById('imei').value;
        let marca = document.getElementById('brand').value;
        let modelo = document.getElementById('model').value;

        if(phoneNumber.length === 0 || imei.length === 0 || marca.length === 0 || modelo.length === 0){throw new Error("no se aceptan campos NULOS");}
        if(Telefono.listar().find(t=>t.imei === imei || t.numeroTelefono === phoneNumber)){throw new Error("Duplicado!");}
        const objTelefono = new Telefono(phoneNumber,imei,marca,modelo)
        document.getElementById('phoneNumber').value = "";
        document.getElementById('imei').value = "";
        document.getElementById('brand').value = "";
        document.getElementById('model').value = "";
        let nombreCliente = "";
        let autoriza = null;
        let abono = 0;
        Swal.fire({
            title: "Ingresa tu nombre:",
            input: "text",
            inputAttributes: {
              autocapitalize: "off"
            },
            showCancelButton: true,
            confirmButtonText: "Ingresar",
            showLoaderOnConfirm: true,}).then((result) => {
            console.log(result);
            console.log(result.value);
            if(result.isConfirmed && result.value!==""){
                nombreCliente = result.value;
                console.log(nombreCliente);
                Swal.fire({
                    title: "Autoriza la revisión?",
                    showDenyButton: true,
                    showCancelButton: true,
                    confirmButtonText: "SI",
                    denyButtonText: `NO`
                }).then((result) => {
                    autoriza = result.isConfirmed;
                    if (result.isConfirmed) {
                        Swal.fire({
                            title:"Ingrese el '%' abonado",
                            input: 'range',
                            inputAttributes: {
                              min: 0,
                              max: 100,
                            },
                            inputValue: 25
                          }).then((result)=>{
                            console.log(result);
                            abono = Number(result.value);
                            if(Number(result.value)>=50 && autoriza){
                                const nuevoCliente = new Cliente(nombreCliente,autoriza,abono,phoneNumber);
                                let listClientes = Cliente.listar();
                                listClientes.push(nuevoCliente)
                                console.log(listClientes);
                                localStorage.setItem('clientes', JSON.stringify(listClientes));
                                localStorage.setItem('celular', JSON.stringify(objTelefono));
                                listCelulares = localStorage.getItem('celulares') !== null ? JSON.parse(localStorage.getItem('celulares')):[];
                                listCelulares.push(objTelefono);
                                localStorage.setItem('celulares', JSON.stringify(listCelulares));
                            }
                          })
                    }
                });    
            }
          });
        loadSelectTecnicos();
        loadSelectCelulares();
        llenarTabla();
    } catch (error) {
        Swal.fire(`Error:${error.message}`, "", "error");
    }
}
function agregarSkill(event) {
    event.preventDefault();
    try {
        let skill = document.getElementById('skillTecnico').value;
        let nombreTecnico = document.getElementById('tecnicoNombre').value;

        if(skill !== ""){
            Swal.fire({
                title: "Está de acuerdo con ingresar esta skill?",
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "SI",
                denyButtonText: `NO`
            }).then((result) => {
                if (result.isConfirmed) {
                    currentArraySkills.push(skill);
                    displaySkills(currentArraySkills);
                }
                document.getElementById('skillTecnico').value = "";
            });
        }
        else if (skill === "" || nombreTecnico === ""){
            throw new Error("No se aceptan nulos")
        }
    } catch (error) {
        Swal.fire(`Error:${error.message}`, "", "error");
    }
}
function displaySkills(array) {
    const divSkills = document.getElementById('skillsTecnico');
    divSkills.innerHTML = array.length>0 ? array.map(e=>`<li> ${e} </li>`).join('') : "";
}
function submitTecnico(){
    try {
        let nombre = document.getElementById('tecnicoNombre').value;
        if(nombre==="" || currentArraySkills.length === 0){throw new Error("No se aceptan campos Nulos")}
        const nuevoTecnico = new Tecnico(nombre,currentArraySkills);
        let tecnicos = localStorage.getItem('tecnicos')!== null ? JSON.parse(localStorage.getItem('tecnicos')) : [];
        tecnicos.push(nuevoTecnico);
        localStorage.setItem('tecnicos', JSON.stringify(tecnicos));
        currentArraySkills = [];
        displaySkills(currentArraySkills);
        loadSelectTecnicos();
        loadSelectCelulares();
    } catch (error) {
        Swal.fire(`Error:${error.message}`, "", "error");
    }
}
function llenarTabla() {
    const tabla = document.getElementById('tbTelefonos');
    const divModales = document.getElementById("modalesReparacion");
    divModales.innerHTML = "";
    // Limpiar la tabla antes de volver a llenar
    while (tabla.rows.length > 1) {
      tabla.deleteRow(1);
    }

    // Iterar sobre el array y agregar filas a la tabla
    for (const celular of Telefono.listar()) {
      const fila = tabla.insertRow(-1); // -1 inserta al final

      const celdaNumero = fila.insertCell(0);
      const celdaImei = fila.insertCell(1);
      const celdaEstado = fila.insertCell(2);
    
      celdaImei.textContent = celular.imei;
      celdaNumero.textContent = celular.numeroTelefono;
      celdaEstado.textContent = celular.estado;
      fila.insertCell(3).innerHTML  = `<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#reparacion_${celular.numeroTelefono}">Reparar</button>`;
      console.log(crearReparacionModal(celular.imei));
      divModales.innerHTML += crearReparacionModal(celular.imei);
    }
  }
  function submitRevision(){
    try {
        listRevisiones = Revision.listar();
        
        const tecnicoEncontrado = Tecnico.listar().find(t => t.nombre === document.getElementById('revisionTecnico').value);
        const telefonoEncontrado = Telefono.listar().find(tlf => tlf.imei === document.getElementById('revisionTelefono').value);

        if(tecnicoEncontrado === undefined){
            throw new Error("Seleccione un Técnico");
        }
        if(telefonoEncontrado === undefined){
            throw new Error("Seleccione un Telefono");
        }

        const diagnosticoIngresado = document.getElementById('revisionDiagnostico').value.trim();

        if(diagnosticoIngresado.length === 0){
            throw new Error("Ingrese un diagnóstico");
        }

        console.log(tecnicoEncontrado);
        console.log(telefonoEncontrado);

        const revision = new Revision(tecnicoEncontrado);
        revision.realizarDiagnostico(telefonoEncontrado, diagnosticoIngresado);

        listRevisiones.push(revision);
        console.log(revision);
        localStorage.setItem('revisiones',JSON.stringify(listRevisiones));
        
        llenarTabla();
        
    } catch (error) {
        Swal.fire(`Error: ${error.message}`, "", "error");
    }
}

let currentArrayRepuestos = [];

function agregarRepuesto(event,numeroTelefono) {
    event.preventDefault();
    try {
        let repuesto = document.getElementById(`repuesto_${numeroTelefono}`).value;
        if(repuesto !== ""){
            Swal.fire({
                title: "Está seguro?",
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "SI",
                denyButtonText: `NO`
            }).then((result) => {
                if (result.isConfirmed) {
                    currentArrayRepuestos.push(repuesto);
                    displayRepuestos(currentArrayRepuestos,numeroTelefono);
                }
                document.getElementById(`repuesto_${numeroTelefono}`).value = "";
            });
        }
        else if (repuesto === ""){
            throw new Error("No se aceptan nulos")
        }
    } catch (error) {
        Swal.fire(`Error:${error.message}`, "", "error");
    }
}
function displayRepuestos(array,numeroTelefono) {
    const divRepuestos = document.getElementById(`repuestos_${numeroTelefono}`);
    divRepuestos.innerHTML = array.length>0 ? array.map(e=>`<li> ${e} </li>`).join('') : "";
}
function cerrarReparacion(numeroTelefono) {
    currentArrayRepuestos = [];
    displayRepuestos(currentArrayRepuestos,numeroTelefono);
}
function crearReparacionModal(imei){
    const telefonoEncontrado = Telefono.listar().find(t=>t.imei === imei);
    const clienteEncontrado = Cliente.listar().find(c => c.numeroTelefono === telefonoEncontrado.numeroTelefono);
    let modalReparacion = `
    <div class="modal fade" id="reparacion_${telefonoEncontrado.numeroTelefono}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Telefono del cliente ${clienteEncontrado.nombre}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="mb-3 row">
                    <div class="col-2">
                        <label class="form-label" for="repuesto_${telefonoEncontrado.numeroTelefono}">Repuesto:</label>
                    </div>
                    <div class="col-7">
                        <input type="text" class="form-control" id="repuesto_${telefonoEncontrado.numeroTelefono}" name="repuesto_${telefonoEncontrado.numeroTelefono}" required></input>
                    </div>
                    <button class="col-3 btn btn-warning" onclick="agregarRepuesto(event,${telefonoEncontrado.numeroTelefono})">Agregar Repuesto</button>
                </div>
                <div class="mb-3 row">                    
                    <ul class="col-12" id="repuestos_${telefonoEncontrado.numeroTelefono}">

                    </ul>       
                </div>
                <div class="mb-3 row">
                    <div class="col-2">
                        <label class="form-label" for="estacion_${telefonoEncontrado.numeroTelefono}">Estación:</label>
                    </div>
                    <select class="col-10 form-control" id="estacion_${telefonoEncontrado.numeroTelefono}" name="estacion_${telefonoEncontrado.numeroTelefono}">
                        <option value="" selected>----------------------</option>
                        
                        <option value="Estación de Entrega">Estación de Entrega</option>
                    </select>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" onclick="cerrarReparacion(${telefonoEncontrado.numeroTelefono})" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" onclick="submitReparacion(document.getElementById('estacion_${telefonoEncontrado.numeroTelefono}').value,currentArrayRepuestos,${telefonoEncontrado.imei})" >Registrar reparacion</button>
            </div>
            </div>
        </div>
    </div>
    `;
    return modalReparacion;
}

function submitReparacion(estacion,arrayRepuestos,paramImei) {
    try {
        if(estacion === ""){throw new Error("No Añadió una estación!");}
        let telefonoEncontrado = Telefono.listar().find(t=>t.imei === paramImei.toString());
        let indexTelf = Telefono.listar().findIndex(t=>t.imei === paramImei.toString());
        let lisTelefonos = Telefono.listar();
        let estadoCambiado = estacion==="Estación de Entrega" ? "Terminado" : "En reparación";
        telefonoEncontrado.estado = estadoCambiado;
        lisTelefonos[indexTelf] = telefonoEncontrado;
        

        localStorage.setItem('celulares',JSON.stringify(lisTelefonos));
        const nuevaReparacion = new Reparacion(telefonoEncontrado.numeroTelefono,estacion,arrayRepuestos);
        let listReparaciones = Reparacion.listar();
        listReparaciones.push(nuevaReparacion);
        localStorage.setItem('reparaciones',JSON.stringify(listReparaciones));
        llenarTabla();
    } catch (error) {
        Swal.fire(`Error:${error.message}`, "", "error");
    }
}
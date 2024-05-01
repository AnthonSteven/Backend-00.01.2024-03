/**
 * Sistema de reparacion de equipos
 * 
 */


// CLASES
class Moviles{
    constructor(nombre,serie,imei,marca){
        this.nombre = nombre;
        this.serie = serie;
        this.imei = imei;
        this.marca = marca;
        this.report= false;
        this.tecnico= "";
        this.diagnostico= "";
        this.abono= false;
    }
}

class ListaImei{
    constructor(serie,imei){
        this.serie = serie;
        this.imei = imei;
    }
}
class ListaTecnicos{
    constructor(codtec,nombre,marca){
        this.codtec = codtec;
        this.nombre = nombre;
        this.marca = marca;
    }
}

class ListaSucursales{
    constructor(distrito,direccion){
        this.distrito = distrito;
        this.direccion = direccion;
    }
}


let arrMoviles = [];

const Ingreso = function () 
{
    let Nombre;
    let Ciudad;
    let movil = null;
    let tblImei = [];
    let tblSuc  = [];
    let tblTec  = [];
    let tblDiagnosticos  = [
        'PANTALLA_ROTA',
        'PROBLEMA_CON_EL_CARGADOR',
        'PROBLEMA_DE_AUDIO',
        'TACTIL_NO_RESPONDE',
        'BOTONES_NO_RESPONDEN',
        'SE_RECALIENTA',
    ];

    function configuracion() {
        console.log("Iniciando la Configuracion");
        $("#titulo").text(Nombre)
        $("#ciudad").text(Ciudad);
        $("#logo").text(Nombre)
        crearSucursales();
        crearImeiReportados();
        crearTecnicos();

        // Leer contenido del local storage
        objLocalMovil = localStorage.getItem("moviles");
        if (objLocalMovil != null) {
            arrMoviles = JSON.parse(objLocalMovil);
        }
    }
    
    // Inicializa datos
    function crearImeiReportados(){
        let objImei1 = new ListaImei("Serie1","IMEI1"); tblImei.push(objImei1);
        let objImei2 = new ListaImei("Serie2","IMEI2"); tblImei.push(objImei2);
        let objImei3 = new ListaImei("Serie3","IMEI3"); tblImei.push(objImei3);
        let objImei4 = new ListaImei("Serie4","IMEI4"); tblImei.push(objImei4);
        let objImei5 = new ListaImei("Serie5","IMEI5"); tblImei.push(objImei5);
    }
    
    function crearSucursales(){
        let objSuc1 = new ListaSucursales("LIMA","Av. Tacna 257");     tblSuc.push(objSuc1);
        let objSuc2 = new ListaSucursales("SURCO","Av. La Paz 257");   tblSuc.push(objSuc2);
        let objSuc3 = new ListaSucursales("LINCE","Av. Arequipa 367"); tblSuc.push(objSuc3);
        let objSuc4 = new ListaSucursales("BREÑA","Av. Arica 338");    tblSuc.push(objSuc4);
        let objSuc5 = new ListaSucursales("COMAS","Av. Univer. 2467"); tblSuc.push(objSuc5);
    }

    function crearTecnicos(){
        let lisSkill = [];
        lisSkill = ['IPHONE','SAMSUNG'];
        let objTec1 = new ListaTecnicos("TEC01","CARLOS",lisSkill); tblTec.push(objTec1);
        lisSkill = ['SAMSUNG','XIAOMI'];
        let objTec2 = new ListaTecnicos("TEC02","JUAN",lisSkill);   tblTec.push(objTec2);
        lisSkill = ['MOTOROLA','SAMSUNG'];
        let objTec3 = new ListaTecnicos("TEC03","LUIS",lisSkill);   tblTec.push(objTec3);
        lisSkill = ['HAWEI','XIAOMI'];
        let objTec4 = new ListaTecnicos("TEC04","PEDRO",lisSkill);  tblTec.push(objTec4);
        lisSkill = ['HONOR','OPPO','SAMSUNG'];
        let objTec5 = new ListaTecnicos("TEC05","ENRIQUE",lisSkill);  tblTec.push(objTec5);
    }

    function eventos() {
        console.log("Escuchando los eventos")
        $("#ingresarMovil").on("click", ingresarMovil);
        $("#listaMovil").on("click", mostrarEstadoEquipo);
    }

    async function ingresarMovil() {
        $("#verEstadoMovil").hide();
        console.log("Ingresar movil a revisar");

        const { value: formValues } = await Swal.fire({
            title: "Ingresar movil a revisar",
            icon: "info",
            html: `
            <label class="col-md-4 control-label" for="textinput">Cliente</label>  
            <input id="nombre" class="swal2-input entrada" placeholder="Ingresar nombre del cliente">
            <label class="col-md-4 control-label" for="textinput">Serie</label>  
            <input id="serie" class="swal2-input entrada" placeholder="Ingresar numero se serie">
            <label class="col-md-4 control-label" for="textinput">Imei</label>  
            <input id="imei" class="swal2-input entrada" placeholder="Ingresar numero de IMEI">
            <label class="col-md-4 control-label" for="textinput">Marca</label>  
            <input id="marca" class="swal2-input entrada" placeholder="Ingresar la marca del movil">
            `,
            showCloseButton: true,
            showCancelButton: true,
            confirmButtonText: "Revisar",
            denyButtonText: `Cancelar`,
            preConfirm: () => {
                return {
                    nombre:  document.getElementById("nombre").value,
                    serie: document.getElementById("serie").value,
                    imei:  document.getElementById("imei").value,
                    marca:  document.getElementById("marca").value
                };
            }
        });
        if (formValues) {
            // Verificar Serie y Imei si el equipo esta reportado
            let serie = formValues.serie;
            let imei = formValues.imei;

            let movEstado = false
            for(let n=0; n<tblImei.length; n++){
                if(serie==tblImei[n].serie && imei==tblImei[n].imei) {
                    Swal.fire("Equipo movil reportado, no puede ingresar al servicio");
                    movEstado = true
                }
            }
            
            movil =new Moviles(formValues.nombre, formValues.serie, formValues.imei, formValues.marca, movEstado);        

            if (movEstado===true){
                // Si esta reportado retorna
                // Almacenar historial
                movil.report = true;
                movil.tecnico = '';
                movil.diagnostico = '';
                arrMoviles.push(movil);
                // Almacenamiento en LocalStorage
                localStorage.setItem("moviles", JSON.stringify(arrMoviles));
                return;
            }

            // Si el equipo no esta reportado, consulta si se procede a su revision
            let aprovadoRevision = validaRevision(formValues.marca)
        }
    }

    async function validaRevision(marca) {

        const { value: formValues } = await Swal.fire({
            title: "Confirmar revision",
            icon: "info",
            html: `
            <label class="col-md-4 control-label" for="textinput">Equipo movil no esta reportado. ¿Desea proceder con la reparacion del equipo?</label>  
            `,
            showCloseButton: true,
            showCancelButton: true,
            confirmButtonText: "Si",
            denyButtonText: "No",
            preConfirm: () => {
                // SI SE CONFIRMA BUSCAR UN TECNICO
                let codTec = asignarTecnico(marca);

                if(codTec==='-'){
                    Swal.fire("No se pudo asignar un tecnico para reparar el equipo");

                    movil.tecnico='NO_SE_ASIGNO_TECNICO';
                    arrMoviles.push(movil);
                    // Almacenamiento en LocalStorage
                    localStorage.setItem("moviles", JSON.stringify(arrMoviles));
                }else{
                    // Se agrega el tecnico
                    movil.tecnico = codTec;

                    // PASAR DIAGNOSTICO
                    //Uso de una funcion randon para seleccionar al azar un diagnostico
                    let nNum = ranRangoNum(0,tblDiagnosticos.length-1)
                    let nomDiagnostico = tblDiagnosticos[nNum];
                    movil.diagnostico = nomDiagnostico;

                    confirmacionReparacion(nomDiagnostico);
                }
            }
        });
        if (formValues) {
        }
    }

    function asignarTecnico(marca){
        let codTec = "";
        let nomTec = "";

        for(let t=0;t<tblTec.length;t++){
            for(let m=0;m<tblTec[t].marca.length;m++){
                if(marca.toUpperCase() == tblTec[t].marca[m]){
                    codTec = tblTec[t].codtec;
                    nomTec = tblTec[t].nombre;
                    break;
                }    
            }
        }
        return codTec+'-'+nomTec;
    }

    
    async function confirmacionReparacion(diagnostico) {

        const { value: formValues } = await Swal.fire({
            title: "Confirmar reparacion",
            icon: "info",
            html: `
            <label class="col-md-4 control-label" for="textinput">Diagnostico: ${diagnostico}</label><br>
            <label class="col-md-4 control-label" for="textinput">¿El cliente pago el 50% de la reparacion?</label>
            `,
            showCloseButton: true,
            showCancelButton: true,
            confirmButtonText: "Si",
            denyButtonText: `No`,
            preConfirm: () => {
                movil.abono = true;
            }
        });
        if (formValues) {
            movil.abono = true;
            arrMoviles.push(movil);
            // Almacenamiento en LocalStorage
            localStorage.setItem("moviles", JSON.stringify(arrMoviles));

            mostrarEstadoEquipo(movil);
        }
    }

    function mostrarEstadoEquipo(){
        let cNombre,cSerie,cImei,cMarca,cTecnico,cDiagnostico,cReportado,cAbono;

        // Leer contenido del Local storage
        objLocalMovil = localStorage.getItem("moviles");
        if (objLocalMovil != null) {
            arrMoviles = JSON.parse(objLocalMovil);
        }else{
            Swal.fire("No existen moviles registrados !");
            return;
        }
    
        document.getElementById('verEstadoMovil').innerHTML =`
                        <div class="row">
                            <div class="col-md-6">
                                <h2>Datos del Celular</h2>
                            </div>
                            <div class="col-md-6">
                                <h2>Estados del Telefono</h2>
                            </div>
                        </div>
                        `
        for(let n=0;n<arrMoviles.length;n++){
            cNombre = arrMoviles[n].nombre;
            cSerie  = arrMoviles[n].serie;
            cImei   = arrMoviles[n].imei;
            cMarca  = arrMoviles[n].marca;

            cTecnico= arrMoviles[n].tecnico;
            cTecnico= cTecnico=='' ? '[***NO_TECNICO***]' : cTecnico;

            cDiagnostico= arrMoviles[n].diagnostico;
            cDiagnostico= cDiagnostico=='' ? '[***NO_DIAGNOSTICADO***]' : cDiagnostico;

            cReportado = arrMoviles[n].report ? "Reportado" : "No_reportado";
            cAbono =  arrMoviles[n].abono ? "Realizo_el_abono_del_50%" : "No_realizo_el_abono";
    
            document.getElementById('verEstadoMovil').innerHTML +=`
                        <div class="row">
                            <div class="col-md-6">
                                <table class="table">
                                    <tr>
                                        <td> <label for="">Cliente</label></td>
                                        <td><input type="text" name="" id="idcliente" value=${cNombre} disabled></td>
                                    </tr>
                                    <tr>
                                        <td> <label for="">Serie</label></td>
                                        <td><input type="text" name="" id="idserie" value=${cSerie} disabled></td>
                                    </tr>
                                    <tr>
                                        <td> <label for="">Inei</label></td>
                                        <td><input type="text" name="" id="idinei" value=${cImei} disabled></td>
                                    </tr>
                                    <tr>
                                        <td> <label for="">Marca</label></td>
                                        <td><input type="text" name="" id="idmarca" value=${cMarca} disabled></td>
                                    </tr>
                                </table>
                            </div>
                            <div class="col-md-6">
                                <table class="table">
                                    <tr>
                                        <td> <label for="">Reportado</label></td>
                                        <td><input type="text" name="" id="idreportado" value=${cReportado} disabled></td>
                                    </tr>
                                    <tr>
                                        <td> <label for="">Tecnico</label></td>
                                        <td><input type="text" name="" id="idtecnico" value=${cTecnico} disabled></td>
                                    </tr>
                                    <tr>
                                        <td> <label for="">Diagnostico</label></td>
                                        <td><input type="text" name="" id="iddiagnostico" value=${cDiagnostico} disabled></td>
                                    </tr>
                                    <tr>
                                        <td> <label for="">Abono 50%</label></td>
                                        <td><input type="text" name="" id="idabono" value=${cAbono} disabled></td>
                                    </tr>
    
                                </table>
                            </div>
                        </div>`
        }

        $("#verEstadoMovil").show();
    }

    return {
        init: function (parametros) {
            console.log(parametros)
            Nombre = parametros.nombre;
            Ciudad = parametros.ciudad;
            configuracion();
            eventos();
        },
    };
}();


// FUNCIONES
function ranRangoNum(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}



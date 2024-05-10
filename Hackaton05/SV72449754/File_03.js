
let Arr_Devices=[];
let Arr_Tech=[];
let Arr_OrdenServicio=[];
let Arr_AreaEnsamblaje=[];
let Arr_AreaSoftware=[];
let Arr_AreaEntrega=[];
let $table = $('#table');
let $tableEnsamblaje = $('#tableEnsamblaje');
let $tableSoftware = $('#tableSoftware');
let $tableEntrega = $('#tableEntrega');


//Descripcion de los SKILLS de los tecnicos
let skill_Tec01=[
    {equipo:"celular",
    marca:["Apple","Samsung","Motorola"]},
    {equipo:"SmartWatch",
    marca:["Apple","Samsung","Ticwatch","Fitbit"]},
    {equipo:"Tablet",
    marca:["Apple","Samsung","Toshiba","Lenovo"]},
    {equipo:"Laptop",
    marca:[]}
];

let skill_Tec02=[
    {equipo:"celular",
    marca:["Apple","Oppo"]},
    {equipo:"SmartWatch",
    marca:[]},
    {equipo:"Tablet",
    marca:["Apple","Samsung","Lenovo"]},
    {equipo:"Laptop",
    marca:["Dell","Lenovo"]}
];

let skill_Tec03=[
    {equipo:"celular",
    marca:["Xiaomi","Samsung"]},
    {equipo:"SmartWatch",
    marca:["Ticwatch","Fitbit"]},
    {equipo:"Tablet",
    marca:[]},
    {equipo:"Laptop",
    marca:["Dell","Lenovo"]}
];

let skill_Tec04=[
    {equipo:"celular",
    marca:[]},
    {equipo:"SmartWatch",
    marca:["Apple","Samsung","Ticwatch"]},
    {equipo:"Tablet",
    marca:["Apple","Samsung","Lenovo"]},
    {equipo:"Laptop",
    marca:["Dell","Lenovo","Asus","MSI"]}
];



//Inicializando la Funcion
const FunctionAnonima=function(){
    let Nombre;
    let Direccion;

    function configurar() {
        console.log("iniciando la Configuracion");

        // Crear los tecnicos de la empresa
        CrearTecnicos(); 
    }

    function Eventos(){

        $table.bootstrapTable({ data: Arr_OrdenServicio });
        $tableEnsamblaje.bootstrapTable({ data: Arr_AreaEnsamblaje });
        $tableSoftware.bootstrapTable({ data: Arr_AreaSoftware });
        $tableEntrega.bootstrapTable({ data: Arr_AreaEntrega });


        //Eventos de Botones
        document.getElementById("Btn_ClearCeluar").addEventListener("click",crear_OrdenServicio);

        document.getElementById("cerrarVentana").addEventListener("click", (e) => {
            e.preventDefault();
            document.getElementById("infoCliente").style.display = "none";
        })

        document.getElementById("verAreaInicial").addEventListener("click", (e) => {
            e.preventDefault();
            $table.bootstrapTable('load', Arr_OrdenServicio)
            $tableEnsamblaje.bootstrapTable('load', Arr_AreaEnsamblaje)
            document.getElementById("tblAreaInicial").style.display = "block";
        })

        document.getElementById("verAreaEnsamblaje").addEventListener("click", (e) => {
            e.preventDefault();
            $tableEnsamblaje.bootstrapTable('load', Arr_AreaEnsamblaje);
            $table.bootstrapTable('load', Arr_OrdenServicio);
            document.getElementById("tblAreaEnsamblaje").style.display = "block";
        })

        document.getElementById("verAreaSoftware").addEventListener("click", (e) => {
            e.preventDefault();
            $tableSoftware.bootstrapTable('load', Arr_AreaSoftware);
            $tableEnsamblaje.bootstrapTable('load', Arr_AreaEnsamblaje);
            document.getElementById("tblAreaSoftware").style.display = "block";
        })

        document.getElementById("verAreaEntrega").addEventListener("click", (e) => {
            e.preventDefault();
            $tableEntrega.bootstrapTable('load', Arr_AreaEntrega);
            $tableSoftware.bootstrapTable('load', Arr_AreaSoftware);
            document.getElementById("tblAreaEntrega").style.display = "block";
        })


        document.getElementById("cerrarResumen").addEventListener("click", (e) => {
            e.preventDefault();
            document.getElementById("CtnResumen").style.display = "none";
        }) 
    }

  

    return {
        init: function () {
            configurar();
            Eventos() ;
        }
    }
}();


function CrearTecnicos(){
    //Tecnico 01
    let Tec_01=new Tecnicos("Jose Diaz",24586300,"TC-01");
    Tec_01.Skills=skill_Tec01;
    Arr_Tech.push(Tec_01);

    //Tecnico 02
    let Tec_02=new Tecnicos("Marco Casas",42589612,"TC-02");
    Tec_02.Skills=skill_Tec02;
    Arr_Tech.push(Tec_02);

    //Tecnico 03
    let Tec_03=new Tecnicos("Raul Flores",77766655,"TC-03");
    Tec_03.Skills=skill_Tec03;
    Arr_Tech.push(Tec_03);

    //Tecnico 04
    let Tec_04=new Tecnicos("Cesar Perez",63451278,"TC-04");
    Tec_04.Skills=skill_Tec04;

    //Agregando al Array de Objetos tecnicos
    Arr_Tech.push(Tec_04);

}


function crear_OrdenServicio(){
    let Nombre=prompt("Introduzca el nombre del Cliente");
    let Documento=prompt("Introduzca el Documento del Cliente");
    let Codido_Servicio=prompt("Introduzca el codido de servicio"+"\nPor Ejemplo: C-001,C-002,...C-xxx");
    let Tipo=prompt("Introduzca el tipo de equipo"+"\nPor Ejemplo: Celular, SmartWatch, Tablet, Laptop");
    let Marca=prompt("Introduzca la marca del equipo"+"\nPor Ejemplo: Apple, Motorola, Smasung, Etc");
    let Modelo=prompt("Introduzca el modelo del equipo");
    let Diagnostic_01=prompt("Introduzca el 1er Diagnostico");
    

    // Creacion de Objeto cliente-Dispositivo
    let ObjCliente= new ClienteDevice(Marca, Modelo,Tipo);
    ObjCliente.Usuario.Nombre=Nombre;
    ObjCliente.Usuario.Documento=Documento;
    

    // Creacion del Objeto Servicio
    let Tech_Select ={};
    let ObjServicio= new OrdenServicio (Codido_Servicio,ObjCliente);
    ObjServicio.Diagnostico.push(Diagnostic_01);

    let cond=1;
    let Tech=prompt("Introduzca el codigo  de Tecnico a cargo"+"\nPor Ejemplo: TC-01,TC-02,TC-03 o TC-04");

    while (cond) {  
        if (Tech=="TC-01"||Tech=="TC-02" ||Tech=="TC-03" ||Tech=="TC-04" ){
            switch (Tech) {
                case "TC-01":
                    Tech_Select=Arr_Tech[0];
                    break;
        
                case "TC-02":
                    Tech_Select=Arr_Tech[1];
                    break;
                
                case "TC-03":
                    Tech_Select=Arr_Tech[2];
                    break;
                        
                case "TC-04":
                    Tech_Select=Arr_Tech[3];
                    break;
            
                default:
                    break;
            }
            cond=0;
        }
        else{
            Tech=prompt("Por favor,Introduzca el codigo valido del Tecnico"+"\nPor Ejemplo: TC-01,TC-02,TC-03 o TC-04");
        }  
    }


    //Seleccionando el Tecnico adecuado para el Dispositivos
    ObjServicio.Tecnico=Tech_Select;
    ObjServicio.VerificarIMEI();

    //Verificando la Legalidad del IMEI del Dispostivo
    if (ObjServicio.Sts_ReportIMEI) {
        Arr_OrdenServicio.push(ObjServicio);
        alert("La Orden de servicio fue creada correctamnete");
    }
    else{alert("La Orden de servicio no fue creada"+"\nEl Dispostivo no tiene un IMEI legal"+"\npor favor denuncia el Hecho");}

    console.log(ObjServicio);
    cargarInfoCliente(ObjServicio);
 
    document.getElementById("infoCliente").style.display = "block";
    console.log(Arr_OrdenServicio);
}


function cargarInfoCliente(obj) {
    document.getElementById("nombreCliente").value = obj.Cliente.Usuario.Nombre;
    document.getElementById("DocumentoCliente").value = obj.Cliente.Usuario.Documento;
    document.getElementById("equipoCliente").value = `${obj.Cliente.Tipo} / Marca: ${obj.Cliente.Marca} / Modelo: ${obj.Cliente.Modelo}`;
    document.getElementById("Dx01Cliente").value = obj.Diagnostico[0];
    document.getElementById("TecnicoCliente").value =`
    ${obj.Tecnico.Nombre} 
    Experto en Marcas segun dispositivo:
    Celular: ${obj.Tecnico.Skills[0].marca}
    SmartWatch: ${obj.Tecnico.Skills[1].marca}
    Tablet: ${obj.Tecnico.Skills[2].marca}
    Laptop: ${obj.Tecnico.Skills[3].marca}`;

}


function AreaInicialFormatter(value, row, index) {
    
        return [
            '<a class="like" href="javascript:void(0)" id="btnAreaEnsamblaje" title="Like">',
            '<i class="fa fa-heart">Enviar A. Ensamblaje</i>',
            '</a>  '
        ].join('')
    
}

function AreaEnsamblajeFormatter(value, row, index) {
    
        return [
            '<a class="like" href="javascript:void(0)" id="btnAreaSoftware" title="Like">',
            '<i class="fa fa-heart">Enviar A. Software</i>',
            '</a>  '
        ].join('')
    
}

function AreaSoftwareFormatter(value, row, index) {
    
    return [
        '<a class="like" href="javascript:void(0)" id="btnAreaEntrega" title="Like">',
        '<i class="fa fa-heart">Enviar A. Entrega</i>',
        '</a>  '
    ].join('')

}


function AreaEntregaFormatter(value, row, index) {
    
    return [
        '<a class="like" href="javascript:void(0)" id="btnAreaRecoger" title="Like">',
        '<i class="fa fa-heart">Entregar a Cliente</i>',
        '</a>  '
    ].join('')

}


window.AreaInicialEvents = {
    'click .like': function (e, value, row, index) {
        EnviarAreaEnsamblaje(row);
    },
    'click .remove': function (e, value, row, index) {
        $table.bootstrapTable('remove', {
            field: 'id',
            values: [row.id]
        })
    }
}

window.AreaEnsamblajeEvents = {
    'click .like': function (e, value, row, index) {
        EnviarAreaSoftware(row);
    },
    'click .remove': function (e, value, row, index) {
        $table.bootstrapTable('remove', {
            field: 'id',
            values: [row.id]
        })
    }
}

window.AreaSoftwareEvents = {
    'click .like': function (e, value, row, index) {
       EnviarAreaEntrega(row);
    },
    'click .remove': function (e, value, row, index) {
        $table.bootstrapTable('remove', {
            field: 'id',
            values: [row.id]
        })
    }
}


window.AreaEntregaEvents = {
    'click .like': function (e, value, row, index) {
       MostrarResumen(row);
    },
    'click .remove': function (e, value, row, index) {
        $table.bootstrapTable('remove', {
            field: 'id',
            values: [row.id]
        })
    }
}

function EnviarAreaEnsamblaje(obj) {
    console.log(Arr_OrdenServicio);
    Arr_AreaEnsamblaje.push(obj);
    const index = Arr_OrdenServicio.indexOf(obj);
    console.log(index);
    if (index > -1) { // only splice array when item is found
        Arr_OrdenServicio.splice(index, 1); // 2nd parameter means remove one item only
    }
    console.log(Arr_OrdenServicio);
    $table.bootstrapTable('load', Arr_OrdenServicio);
    //console.log(obj);
}


function EnviarAreaSoftware(obj) {
    
    let Diagnostic_02=prompt("Introduzca el 2do Diagnostico para el Ingreso al Area de Software"+"\nEn caso no haya observacion colocar N/A");
    let Repuesto=prompt("Introduzca los Repuestos usados para la reparacion");
    const index = Arr_AreaEnsamblaje.indexOf(obj);
  
    if (index > -1) { // only splice array when item is found
        Arr_AreaEnsamblaje.splice(index, 1); // 2nd parameter means remove one item only
    }
    obj.Repuestos.push(Repuesto);
    obj.Diagnostico.push(Diagnostic_02);
    Arr_AreaSoftware.push(obj);
    $tableEnsamblaje.bootstrapTable('load', Arr_AreaEnsamblaje);
    //console.log(obj);
}


function EnviarAreaEntrega(obj) {
    let Diagnostic_03=prompt("Introduzca el 3er Diagnostico para el Ingreso al Area de Entrega"+"\nEn caso no haya observacion colocar N/A");
    
    const index = Arr_AreaSoftware.indexOf(obj);
    if (index > -1) { // only splice array when item is found
        Arr_AreaSoftware.splice(index, 1); // 2nd parameter means remove one item only
    }
    obj.Diagnostico.push(Diagnostic_03);
    Arr_AreaEntrega.push(obj);
    $tableSoftware.bootstrapTable('load', Arr_AreaSoftware);
  
}

function MostrarResumen(obj){
    let Precio=prompt("Introduzca el Monto a pagar por el servicio");
    obj.Precio=Precio;

    document.getElementById("td_Codigo").innerText = `${obj.Cod_Servicio}`;
    document.getElementById("td_Cliente").innerText = `Nombre: ${obj.Cliente.Usuario.Nombre} ,  DNI: ${obj.Cliente.Usuario.Documento}`;
    document.getElementById("td_Equipo").innerText = `Dispositivo: ${obj.Cliente.Tipo},  Marca: ${obj.Cliente.Marca},  Modelo: ${obj.Cliente.Modelo}`;
    document.getElementById("td_Diagnostico").innerText = `1.-${obj.Diagnostico[0]}, 2.-${obj.Diagnostico[1]}, 3.-${obj.Diagnostico[2]}`;
    document.getElementById("td_Repuestos").innerText = obj.Repuestos[0];
    document.getElementById("td_Precio").innerText =`$/${obj.Precio}`
    document.getElementById("CtnResumen").style.display = "block"

    const index = Arr_AreaEntrega.indexOf(obj);
    if (index > -1) { // only splice array when item is found
        Arr_AreaEntrega.splice(index, 1); // 2nd parameter means remove one item only
    }
    $tableEntrega.bootstrapTable('load', Arr_AreaEntrega);

}

class ClienteDevice {
    constructor(Marca, Modelo,Tipo) {
        this.Usuario = {};  
        this.Marca = Marca;
        this.Modelo = Modelo;
        this.Tipo = Tipo;
        this.Descripcion=`${Tipo}: ${Marca} - ${Modelo}`;
          
    }
}


class Tecnicos {
    constructor(Nombre, Documento,Codigo) {
        this.Nombre = Nombre;
        this.Documento = Documento;
        this.Codigo = Codigo;
        this.Skills = [];  
    }
}


class OrdenServicio {
    constructor(Cod_Servicio,Cliente,Tecnico) {
        this.Cod_Servicio = Cod_Servicio;
        this.Cliente = Cliente;
        this.Diagnostico= [];
        this.Tecnico = Tecnico;
        this.Repuestos= [];
        this.Sts_ReportIMEI=false;
        this.Precio=0;
       
    }
    VerificarIMEI(){
        let Sts_Report=prompt("El celular paso la verificacion de IMEI Valida: Y/N");
        if(Sts_Report=="Y" || Sts_Report=="y") {
            this.Sts_ReportIMEI=true;
        }
        else{this.Sts_ReportIMEI=false;}
    }
}



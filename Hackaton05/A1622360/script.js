let arrTelefonos = [];

const Reparaciones = (function () {
    let Nombre;
    let Ubicacion;

    function eventos() {
        document.getElementById("ingresoTelefono").addEventListener("click", ingresarTelefono);
        document.getElementById("autorizacion").addEventListener("click", confirmacion);
    }

    function ingresarTelefono() {
        let IMEI = prompt("Ingresa el IMEI");
        if (IMEI !== null && IMEI !== "") {
            let nuevoTelefono = new Telefono(IMEI);
            nuevoTelefono.verificarIMEI();
            document.getElementById("estado").innerHTML = "Inicio";
        }
    }

    return {
        init: function (parametros) {
            Nombre = parametros.Nombre;
            Ubicacion = parametros.Ubicacion;
            eventos();
        },
    };
})();

class Telefono {
    constructor(imei, estado = false) {
        this.imei = imei;
        this.estado = estado;
    }

    verificarIMEI() {
        Swal.fire({
            title: "¿El IMEI está libre?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Sí",
            denyButtonText: "No"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire("¡Guardado!", "", "success");
                arrTelefonos.push(this);
                document.getElementById("diagnostico").disabled = false;
            } else if (result.isDenied) {
                Swal.fire("No se puede proveer el servicio", "", "info");
            }
        });
    }
}

function confirmacion() {
    Swal.fire({
        title: "¿La reparación está por empezar?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Sí",
        denyButtonText: "No"
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire("¡Guardado!", "", "success");
            arrTelefonos.push(this);
            document.getElementById("finalizado").disabled = false;
            document.getElementById("estado").innerHTML = "Empezando";
        } else if (result.isDenied) {
            Swal.fire("En caso cambie de opinión, lo esperamos", "", "info");
            document.getElementById("estado").innerHTML = "Rechazado";
        }
    });
}

document.getElementById("diagnostico").addEventListener("click", function () {
    let diagN = "DIAGNOSTICO:  Se encontró dañada la unidad de pantalla , el costo seria de 250 ";
    alert(diagN);
    document.getElementById("myCheck").disabled = false;
    document.getElementById("mySelect").disabled = false;
    document.getElementById("estado").innerHTML = "Diagnóstico";
});

document.getElementById("myCheck").addEventListener("click", function () {
    var checkBox = document.getElementById("myCheck");
    var text = document.getElementById("text");
    text.style.display = checkBox.checked ? "block" : "none";
    document.getElementById("autorizacion").disabled = !checkBox.checked;
    document.getElementById("estado").innerHTML = checkBox.checked ? "Cotizado" : "Rechazado";
});

document.getElementById("mySelect").addEventListener("change", function () {
    var marca = document.getElementById("mySelect").value;
    var tecn;
    switch (marca) {
        case "Samsung":
            tecn = "Luis Enrique";
            break;
        case "Apple":
            tecn = "Eloy Edgar";
            break;
        case "Xiaomi":
            tecn = "Artur Medina";
            break;
        case "Oppo":
            tecn = "Gorge Campos";
            break;
        case "Motorola":
            tecn = "Ruben Bazalar";
            break;
        case "Huawei":
            tecn = "Petter Bartolo";
            break;
        case "Realme":
            tecn = "Alejandro Rosales";
            break;
        default:
            tecn = "Cesar Flores";
            break;
    }
    document.getElementById("tecnico").innerHTML = "El técnico especialista es: " + tecn;
});

document.getElementById("finalizado").addEventListener("click", function () {
    document.getElementById("estado").innerHTML = "Terminado";
});
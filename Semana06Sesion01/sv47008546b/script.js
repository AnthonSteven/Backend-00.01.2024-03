
class Gundam {
    constructor(nombre, descripcion, imagen, escala, isCustom = false, custom = "") {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.imagen = imagen;
        this.escala = escala;
        this.isCustom = isCustom;
        this.custom = custom;
    }
}

var $table = $('#table');
let arrGundams = [];
let objLocalGundams;
let login;

window.accionEvents = {
    'click .like': function (e, value, row, index) {
        editarItem(row);
    },
    'click .remove': function (e, value, row, index) {
        borrarItem(row);
    }
}
$("#btnEliminar").on("click", function (event) {
    event.preventDefault();
    console.log("Eliminar Todo");
    arrGundams = [];
    localStorage.setItem("gundams", JSON.stringify(arrGundams));
    $table.bootstrapTable('load', arrGundams);
})
$("#btnAgregar").on("click", function (event) {
    event.preventDefault();
    console.log("Agregando un nuevo");
    let nombre = prompt("Agrega el nombre");
    let descripcion = prompt("Agregar la descripcion");
    let imagen = prompt("Agrega la imagen");
    let escala = prompt("Agrega la escala");
    let custom = "";
    let isCustom = prompt("Esta modificado");
    if (isCustom == "SI") {
        custom = prompt("Que le modificaste")
    }; // custom es un boleano, colocaremos un ternario.

    let objGundam = new Gundam(nombre, descripcion, imagen, escala, (isCustom == "SI" ? true : false), (isCustom == "SI" ? custom : ""))
    arrGundams.push(objGundam);
    console.log(arrGundams);
    localStorage.setItem("gundams", JSON.stringify(arrGundams));
    $table.bootstrapTable('load', arrGundams);

})

function accionFormatter(value, row, index) {
    return [
        '<a class="like" href="javascript:void(0)" title="Like">',
        '<i class="fa fa-heart"></i>',
        '</a>  ',
        '<a class="remove" href="javascript:void(0)" title="Remove">',
        '<i class="fa fa-trash"></i>',
        '</a>'
    ].join('')
}

function editarItem(row) {
    console.log(arrGundams);
    const index = arrGundams.indexOf(row);
    console.log(index);
    let nombre = prompt("Agrega el nuevo nombre");
    let descripcion = prompt("Agregar la nueva descripcion");
    let imagen = prompt("Agrega la nueva imagen");
    let escala = prompt("Agrega la nueva escala");
    let custom = "";
    let isCustom = prompt("Esta modificado");
    if (isCustom == "SI") {
        custom = prompt("Que le modificaste")
    }
    arrGundams[index].nombre = nombre;
    arrGundams[index].descripcion = descripcion;
    arrGundams[index].imagen = imagen;
    arrGundams[index].escala = escala;
    arrGundams[index].isCustom = (isCustom == "SI" ? true : false);
    arrGundams[index].custom = (isCustom == "SI" ? custom : "");

    console.log(arrGundams);
    $table.bootstrapTable('load', arrGundams);
    localStorage.setItem("gundams", JSON.stringify(arrGundams));

}

function borrarItem(row) {
    console.log(arrGundams);
    const index = arrGundams.indexOf(row);
    console.log(index);
    if (index > -1) { // only splice array when item is found
        arrGundams.splice(index, 1); // 2nd parameter means remove one item only
    }
    console.log(arrGundams);
    $table.bootstrapTable('load', arrGundams);
    localStorage.setItem("gundams", JSON.stringify(arrGundams));

}
// let objLocalGundams = localStorage.getItem("gundams");
// if (objLocalGundams != null) {
//     arrGundams = JSON.parse(objLocalGundams);
// }
// let login = JSON.parse(sessionStorage.getItem("login"));
// if (login == null) {
//     window.location.replace("http://127.0.0.1:5500/Semana06Sesion01/sv47008546b/login.html");
// }
// else {
//     if (!login.login)
//  console.log("No se debe recordar las credenciales")}
function detailFormatter(index, row) {
    console.log(row)
    var html = []
    $.each(row, function (key, value) {
        switch (key) {
            case "imagen":
                html.push('<img src="img/' + value + '.webp" alt="" srcset="" width="300px">')

                break;
            case "isCustom":
                if (value) {
                    let arrCustom = row.custom.split(',');
                    console.log(arrCustom);
                    let htmlstr = "<b>MODIFICACIONES:</b><ul>";
                    arrCustom.forEach(element => {
                        htmlstr += "<li>" + element + "</li>"
                    });
                    htmlstr += "</ul>";
                    html.push('<p>' + htmlstr + '</p>')
                }

                break;
            case "custom":
                break;
            default:
                html.push('<p><b>' + key.toUpperCase() + ':</b> ' + value + '</p>')
                break;
        }
    })
    return html.join('')
}
const Gundams = function () {
    login = JSON.parse(sessionStorage.getItem("login"));
    if (login == null) {
        window.location.replace("http://127.0.0.1:5500/Semana06Sesion01/sv47008546b/login.html");
    }
    else {
        if (!login.login)
            console.log("No se debe recordar las credenciales")
    }
    objLocalGundams = localStorage.getItem("gundams"); // "gundams" es un nombre inventado que le daremos a la informacion guardada en nuestro local storage.
    if (objLocalGundams != null) {
        arrGundams = JSON.parse(objLocalGundams);
    }
    $table.bootstrapTable();
    $table.bootstrapTable('load', arrGundams);
}();
// init();
// function init() {
//     $table.bootstrapTable();
//     $table.bootstrapTable('load', arrGundams);
// }



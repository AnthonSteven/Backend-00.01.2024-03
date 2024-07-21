// if (typeof(Storage) !== "undefined") {
//     // Code for localStorage/sessionStorage.
//     console.log("Si esta habilitado el webstorae")
//   } else {
//     // Sorry! No Web Storage support..
//     console.log("NO esta habilitado el webstorae")
//   }

//   localStorage.setItem("apellido", "Pineda");

//   document.getElementById("data").innerHTML = localStorage.getItem("apellido");

//   let objInfo = {
//     nombre:"Roberto",
//     apellido:"Pineda",
//     edad: 40,
//     hobbies:[
//         "AeroModelismo",
//         "Gunpla"
//     ]
//   }

//   localStorage.setItem("info",JSON.stringify(objInfo));
// console.log(localStorage.getItem("info"));
//   document.getElementById("info").innerHTML = localStorage.getItem("info");
//  //let objJSON = localStorage.getItem("info");
//   let strHtml = "<ul>";
//    let objJSON = JSON.parse( localStorage.getItem("info"));

//   Object.keys(objJSON).forEach(function(key) {

//     strHtml+= `<li> ${objJSON[key]} </li>`

//   });

//   strHtml += "</ul>"
//   document.getElementById("result").innerHTML =strHtml;


// let sesionObj = sessionStorage.getItem("login");
// if(sesionObj!== null){
//     console.log("Si esta logueado")
// }
// else{
//     console.log("No se ha legueado proceder al login")
//     let objLogin = {
//         user:"rpineda",
//         pass:"1234567890"
//     } 
//     sessionStorage.setItem("login", JSON.stringify(objLogin));
// }

// let btnLogin = document.getElementById("btnLogin");
// btnLogin.addEventListener("click", login(e));
// function login(e){
//   e.preventDefault();
//   console.log("Hizo Click");
// }

let login = JSON.parse(sessionStorage.getItem("login"));
if (login == null) {
  window.location.replace("http://127.0.0.1:5500/Semana06Sesion01/sv47008546/login.html");
}
else {
  if (!login.login)
    console.log("No se debe recordar las credenciales")
}
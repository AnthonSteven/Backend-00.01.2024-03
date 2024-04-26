if (typeof(Storage) !== "undefined") {
    // Code for localStorage/sessionStorage.
    console.log("Si esta habilitado el webstorae")
  } else {
    // Sorry! No Web Storage support..
    console.log("NO esta habilitado el webstorae")
  }

  localStorage.setItem("apellido", "Pineda");

  document.getElementById("data").innerHTML = localStorage.getItem("apellido");

  let objInfo = {
    nombre:"Roberto",
    apellido:"Pineda",
    edad: 40,
    hobbies:[
        "AeroModelismo",
        "Gunpla"
    ]
  }

  localStorage.setItem("info",JSON.stringify(objInfo));
console.log(localStorage.getItem("info"));
  document.getElementById("info").innerHTML = localStorage.getItem("info");

  let strHtml = "<ul>";
  //let objJSON = localStorage.getItem("info");
  let objJSON = JSON.parse( localStorage.getItem("info"));

  Object.keys(objJSON).forEach(function(key) {

  
    strHtml+= `<li> ${objJSON[key]} </li>`
  
  });
  
  strHtml += "</ul>"
  document.getElementById("result").innerHTML =strHtml;


let sesionObj = sessionStorage.getItem("login");
if(sesionObj!== null){
    console.log("Si esta logueado")
}
else{
    console.log("No se ha legueado proceder al login")
    let objLogin = {
        user:"rpineda",
        pass:"1234567890"
    } 
    sessionStorage.setItem("login", JSON.stringify(objLogin));
}






localStorage.setItem("info",JSON.stringify(objInfo));
console.log(localStorage.getItem("info"));
document.getElementById("info").innerHTML = localStorage.getItem("info");

let strHtml = "<ul>";
let objJSON = localStorage.getItem("info");
objJSON.forEach(element => {
    strHtml += `<li> ${element}</li>`
});
objJSON.forEach(objJSON).forEach(function(key){
    strHtml+= `<li>${objJSON[key]}</li>`
});
strHtml += "</lu>"
document.getElementById("result").innerHTML = strHtml;

let sesionObj = sessionStorage.getItem("login");
if (sesionObj!==null){
    console.log("Si esta logueado")
} else {
    console.log("No se ha logueado proceder al login")
let objlogin = {
    user: "rpineda",
    pass: "1234567898"
}
sessionStorage.setItem("login", JSON.stringify(objlogin));
}


let loginform = document.getElementById("login-form");
let txtusername = document.getElementById("username");
let txtpassword = document.getElementById("password");
let chbrememberme = document.getElementById("remember-me");

loginform.addEventListener("submit", function login(e) {
    e.preventDefault();
    console.log("Hizo Click")
    console.log(txtusername.value)
    console.log(txtpassword.value)
    console.log(chbrememberme.checked)
    if (txtusername.value == "antony" && txtpassword.value == "123456") {
        console.log("Login Correcto")
        if (chbrememberme.checked) {
            sessionStorage.setItem("login", JSON.stringify({ login: true }));
        }
        else {
            sessionStorage.setItem("login", JSON.stringify({ login: false }));
        }
        window.location.replace("http://127.0.0.1:5500/Semana06Sesion01/sv47008546b/index.html");
    }
});
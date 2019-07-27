const address = "http://localhost:8080"

function login_finish(res) {
    if(res != "ok") {
        document.getElementById("button-register").removeAttribute("disabled"); 
        document.getElementById("button-login").removeAttribute("disabled"); 
        alert(res); return;
    }

    window.location = address + "/webs/main/index.html";
}

function register() {
    document.getElementById("button-register").setAttribute("disabled", ""); 
    document.getElementById("button-login").setAttribute("disabled", "");   
    
    var xhr = new XMLHttpRequest(); 
    xhr.open("POST", address + "/register", true);
    xhr.setRequestHeader("content-type", "application/json"); 
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4) {
            login_finish(xhr.responseText); 
        }
    }
    console.log(JSON.stringify({username: document.getElementById("username").value, password: document.getElementById("password").value})); 
    xhr.send(JSON.stringify({"username": document.getElementById("username").value, "password": document.getElementById("password").value})); 
}

function login() {
    document.getElementById("button-register").setAttribute("disabled", ""); 
    document.getElementById("button-login").setAttribute("disabled", "");  

    var xhr = new XMLHttpRequest(); 
    xhr.open("POST", address + "/login", true);
    xhr.setRequestHeader("content-type", "application/json"); 
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4) {
            login_finish(xhr.responseText); 
        }
    }
    console.log(JSON.stringify({username: document.getElementById("username").value, password: document.getElementById("password").value})); 
    xhr.send(JSON.stringify({"username": document.getElementById("username").value, "password": document.getElementById("password").value})); 
}
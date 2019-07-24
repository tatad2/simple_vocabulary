const address = "http://localhost:8080"; 

document.onkeydown = function(event) {
    if(event.keyCode == 13) {
        window.location = address + "/webs/main/index.html";
    }
}
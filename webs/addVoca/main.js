const address = "http://localhost:8080"

function Word() {
    this.initialize.apply(this, arguments); 
}

Word.prototype.initialize = function(word, trans, part, sent) {
    this.word = word;
    this.trans = trans; 
    this.part = part; 
    this.sent = sent; 
}

Word.prototype.check = function() {
    if(this.word == "") return false; 
    if(this.trans == "") return false; 
    return true; 
}

Word.prototype.parse = function() {
    if(this.part == "") this.part = "-"; 
    if(this.sent == "") this.sent = "-"; 

    var temp = this.word.split(" "); this.word = ""; 
    for(var i = 0; i < temp.length; i ++) {
        if(temp[i] != "") this.word += temp[i], this.word += " "; 
    }
    this.word = this.word.slice(0, -1); 
}

function upload_finish(res) {
    console.log(res); 

    if(res == "ok") {
        window.location = address + "/webs/afterAdd/index.html"; 
    }
}

document.onkeydown = function(event) {
    console.log(event.keyCode); 
    if(event.keyCode == 13) {
        upload_word(); 
    }
} 

function upload_word() {
    document.getElementById("button").setAttribute("disabled", ""); 

    var word = new Word(
        document.getElementById("word").value, 
        document.getElementById("trans").value, 
        document.getElementById("part").value, 
        document.getElementById("sent").value
    ); 

    word.parse(); 

    if(!word.check()) {
        alert(); document.getElementById("button").removeAttribute("disabled"); return;
    }

    console.log(word);  

    var xhr = new XMLHttpRequest(); 
    xhr.open("POST", address + "/addVoca", true);
    xhr.setRequestHeader("content-type", "application/json"); 
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4) {
            upload_finish(xhr.responseText); 
        }
    }
    console.log(JSON.stringify(word)); 
    xhr.send(JSON.stringify(word)); 
}
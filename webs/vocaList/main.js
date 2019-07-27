const address = "http://localhost:8080"; 

function Word() {
    this.initialize.apply(this, arguments); 
}

Word.prototype.initialize = function(id, word, trans, sent, prio, impo) {
    this.db_id = id; // database id; 
    this.word = word; 
    this.trans = trans; 
    this.sent = sent; 
    this.prio = prio; 
    this.impo = impo; 

    this.display = "word"; 
}

var word_list = []; 

function construct_element(word, i) {
    // 构造一个元素
    // 这里的id和单词在word_list中的下标相同
    if(!(word instanceof Word)) return;

    var ele = document.createElement("li"); 
    // ele.setAttribute("word", word.word); 
    ele.id = "word" + i; 
    ele.innerHTML = word.word; 

    ele.classList.add("list-group-item"); 
    ele.classList.add("hvr-sweep-to-right"); 
    ele.classList.add("word-ele"); 
    ele.innerHTML = word.word; 
    
    return ele; 
}

function build_voca_list() {
    var p = document.getElementById("voca-list"); 

    while(p.firstChild) {
        p.removeChild(p.firstChild); 
    }

    for(var i = 0; i < word_list.length; i ++) {
        word_list[i].display = "word"; 
        var ele = construct_element(word_list[i], i); 
        p.appendChild(ele); 
    }
}

window.onload = function()
{
    function load_finish(res) {
    // 从服务端接受到单词数据，加入本地列表并刷新页面
        res = JSON.parse(res); 
        // console.log(res); 

        if(res.length == 0) {
            document.getElementById("no-voca").style.display = "block"; 
            return; 
        }

        for(var i = 0; i < res.length; i ++) {
            word_list.push(new Word(res[i].id, res[i].word, res[i].trans, res[i].sent, res[i].prio, res[i].impo)); 
        }

        build_voca_list(); 
    }

    var xhr = new XMLHttpRequest(); 
    xhr.open("GET", address + "/getVocaList"); 
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4) {
            load_finish(xhr.responseText); 
        }
    } 
    xhr.send();

    $("#voca-list").on("click", ".word-ele", function() {  
        var id = this.id.slice(4); 

        if(word_list[id].display == "word") {
            $(this).css("color", "white"); 
            this.innerHTML = word_list[id].trans; 
            this.classList.add("sweep-active");
            word_list[id].display = "trans";  
        }        

        else if(word_list[id].display = "trans") {
            $(this).css("color", "black"); 
            this.innerHTML = word_list[id].word; 
            this.classList.remove("sweep-active"); 
            word_list[id].display = "word"; 
        }
    })
}

function sort_by_lexicographic() {
    word_list.sort(function(a, b) {
        var tempa = a.word.toLowerCase(); 
        var tempb = b.word.toLowerCase(); 
        return tempa < tempb ? -1 : (tempa == tempb ? 0 : 1);
    })

    build_voca_list(); 
}

function sort_by_mastery() {

}
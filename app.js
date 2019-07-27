const express = require('express'); 
const app = express(); 

const bodyParser = require('body-parser'); 
const cookieParser = require('cookie-parser'); 
const session = require('express-session'); 

function Word() {
    this.initialize.apply(this, arguments); 
}

Word.prototype.initialize = function(word, trans, sent, prio, impo) {
    this.word = word; 
    this.trans = trans; 
    this.sent = sent; // sentence
    this.prio = prio; // priority
    this.impo = impo; // importance
}

function check_login_info(username, password) {
    if(username.length <= 2) return false; 
    if(username.length >= 20) return false; 
    if(password.length <= 5) return false; 
    if(password.length >= 20) return false;
    return true; 
}

app.use(bodyParser.json()); 
app.use(cookieParser()); 

app.use(session({
    secret: "12345",
    cookie: {maxAge: 80000},
}))

// 重定向到主页
app.get("/", (req, res) => {
    console.log("redirected to main"); 
    res.redirect("/webs/main/index.html"); 
})

app.post("/register", (req, res) => {
    console.log(req.body); 

    var temp = req.body; 
    var username = temp.username; 
    var password = temp.password; 

    if(!check_login_info(username, password)) {
        res.send("failed: username / password is invalid"); return; 
    }

    // db operation

    req.session.userid = 1; 
    res.send("ok"); 
})

//登陆
app.post("/login", (req, res) => {
    console.log(req.body); 

    var temp = req.body;  
    var username = temp.username; 
    var password = temp.password; 

    if(!check_login_info(username, password)) {
        res.send("failed: username / password is invalid"); return; 
    }

    // interact with database; 

    req.session.userid = 1; // for test; 
    res.send("ok"); 
})

// 添加词汇
app.post("/addVoca", (req, res) => {
    console.log(req.body); 

    // interact with database; 

    res.send("ok"); 
})

// 获取词汇列表
app.get("/getVocaList", (req, res) => {
    console.log(req.session); 
    // interact with database; 

    // these codes are just for test
    var content = []; 
    content.push(new Word("word1", "trans1", "sent1", 1, 2)); 
    content.push(new Word("c", "d", "f", 3, 4)); 

    console.log(content); 

    res.send(JSON.stringify(content)); 
})

// 获取前端自资源
app.use("/webs", (req, res, next) => {
    console.log("send file (webs)"); 
    res.sendFile(__dirname + req.originalUrl); 
    return; 
})

app.use("/lib", (req, res, next) => {
    console.log("send file (lib)"); 
    res.sendFile(__dirname + req.originalUrl); 
    return; 
})

app.listen(8080, () => console.log("listening on port 8080")); 
const express = require('express'); 
const app = express(); 

const bodyParser = require('body-parser'); 

app.use(bodyParser.json()); 

app.get("/", (req, res) => {
    console.log("redirected to main"); 
    res.redirect("/webs/main/index.html"); 
})

app.post("/addVoca", (req, res) => {
    console.log(req.body); 

    // interact with database; 

    res.send("ok"); 
})

app.use("/webs", (req, res, next) => {
    res.sendFile(__dirname + req.originalUrl); 
    return; 
})

app.listen(8080, () => console.log("listening on port 8080")); 
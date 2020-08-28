const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.set('view engine','ejs');


app.get("/",function(req,res){
    res.render("home");
})

app.get("/buysell",function(req,res){
    res.render("Buy-Sell");
})

app.get("/cabshare",function(req,res){
    res.render("Cab-Share");
})

app.get("/faculty",function(req,res){
    res.render("Faculty");
})

app.get("/lostfound",function(req,res){
    res.render("Lost-Found");
})










app.listen(3000,function(){
    console.log("Server has started at port 3000");
})
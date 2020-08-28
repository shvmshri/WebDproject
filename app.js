require('dotenv').config();

const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.set('view engine','ejs');
mongoose.connect("mongodb+srv://"+process.env.NAME+":"+ process.env.PASSWORD + "@cluster0.ncnhl.mongodb.net/IITK",{
    useNewUrlParser:true,useUnifiedTopology:true
});

app.get("/",function(req,res){
    res.render("home");
})

app.get("/buysell",function(req,res){
    res.render("Buy-Sell");
})

app.get("/faculty",function(req,res){
    res.render("Faculty");
})

app.get("/lostfound",function(req,res){
    res.render("Lost-Found");
})

// Cab share
const cabSchema = new mongoose.Schema({
    Date:String,
    Name:String,
    Email:String,
    Phone_no:String,
    Destination:String,
    Departure_time:String
});
const Cab = new mongoose.model('cab',cabSchema);

app.get("/cabshare",function(req,res){
    res.render("Cab-Share");
});
app.post("/cabshare",function(req,res){
    const cab = new Cab({
        Date:req.body.date,
        Name:req.body.name,
        Email:req.body.email,
        Phone_no:req.body.phone_no,
        Destination:req.body.destination,
        Departure_time:req.body.departure_time
    });
    cab.save();
    res.redirect("/cabshare");
    console.log(req.body);
})

app.get("/cabshare/offer",function(req,res){
    res.render('offer');
});
app.get("/cabshare/find",function(req,res){
    res.render("findcab");
})


app.listen(3000,function(){
    console.log("Server has started at port 3000");
})
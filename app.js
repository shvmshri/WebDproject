require('dotenv').config();

const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const Cab = require("./models/cabSchema");


app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.set('view engine','ejs');
mongoose.connect("mongodb+srv://"+process.env.NAME+":"+ process.env.PASSWORD + "@cluster0.ncnhl.mongodb.net/IITK",{
    useNewUrlParser:true,useUnifiedTopology:true
});

app.get("/",function(req,res){
    res.render("home");
})

app.get("/faculty",function(req,res){
    res.render("Faculty/home");
})

app.get("/lostfound",function(req,res){
    res.render("Lost-Found/home");
})
// cabshare
app.get("/cabshare",function(req,res){
    res.render("Cab-Share/home");
});

app.get("/cabshare/offer",function(req,res){
    res.render('Cab-Share/offer');
});

app.get("/cabshare/find",function(req,res){
    res.render("Cab-Share/findcab");
});

app.post("/cabshare/offer",function(req,res){
    const cab = new Cab({
        Date:req.body.date,
        Name:req.body.name,
        Email:req.body.email,
        Phone_no:req.body.phone_no,
        Destination:req.body.destination,
        Departure_time:req.body.departure_time
    });

    cab.save()
    .then(()=>{
        res.redirect("/cabshare");           //yahan success page ko render krna h agr save ho jata h toh vrna false ya btana h 
        console.log(req.body);               //db ke saare methods asynchronous hote uppar vali line chahe run na bhi huyi ho toh bhi next line chl jati h
    })
    .catch((err)=>{
        res.send(false)
    })
});

app.post("/cabshare/find",function(req,res){
    var date = req.body.userdate;
    console.log(date);
    if(date===""){
       Cab.find(function(err,cabs){
           if(!err) res.render('Cab-Share/cabs_cards',{array:cabs});
           else console.log(err);
       })

    }
    else{
       Cab.find({Date:date},function(err,cabs){
           if(!err) res.render('Cab-Share/cabs_cards',{array:cabs});
           else console.log(err);
       })
    }
    
});

// Buy-Sell
app.get("/buysell",function(req,res){
    res.render("Buy-Sell/home");
})
app.get("/sell",function(req,res){
    res.render("Buy-Sell/sell");
})
app.post("/sell",function(req,res){
    var object = req.body;
    console.log(object);
})



// 
app.use((req,res,next)=>{
    res.send("NOT FOUND");
})

app.listen(3000,function(){
    console.log("Server has started at port 3000");
})



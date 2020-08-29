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

app.get("/",function(req,res,next){
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


app.get("/cabshare",function(req,res){
    res.render("Cab-Share");
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
        res.redirect("/cabshare");           //yahan success page pe redirect krna h 
        console.log(req.body);
    })
    .catch((err)=>{
        res.send(false)
    })
})

app.get("/cabshare/offer",function(req,res){
    res.render('Cab-Share/offer');
});
app.get("/cabshare/find",function(req,res){
    res.render("findcab");
});
app.post("/cabshare/find",function(req,res){
    var date = req.body.userdate;
    console.log(date);
    if(date===""){
       Cab.find(function(err,cabs){
           if(!err) res.render('cabs_cards',{array:cabs});
           else console.log(err)
       })

    }
    else{
       Cab.find({Date:date},function(err,cabs){
           if(!err) res.render('cabs_cards',{array:cabs});
           else console.log(err);
       })
    }
    
});

app.use((req,res,next)=>{
    res.send("NOT FOUND");
})

app.listen(3000,function(){
    console.log("Server has started at port 3000");
})



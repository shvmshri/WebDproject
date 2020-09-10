require('dotenv').config();

const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const multer = require('multer');
const Cab = require("./models/cabSchema");
const fs = require('fs');
const path = require('path');



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
var storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"uploads");
    },
    filename:function(req,file,cb){
        cb(null,file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})
var upload = multer({storage:storage});


const sellSchema = new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true
    },
    Phone_no:
        {
            type:String,
            required:true
        },
    Item_name:{
        type:String,
        required:true
    },
    Category:{
        type:String,
        required:true
    },
    Specifications:String,
    Image:[{
        data:Buffer,
        contentType:String
    }]
});
const Sell = new mongoose.model("sell",sellSchema);


app.get("/buysell",function(req,res){
    res.render("Buy-Sell/home");
})
app.get("/sell",function(req,res){
    res.render("Buy-Sell/sell");
})
app.post("/sell",upload.array('Images',4),function(req,res){
    var object = req.body;
    var images = [];
    console.log(object);
    console.log(req.files);
    req.files.forEach(function(e){
        var img = fs.readFileSync(e.path);
        var encode_img = img.toString('base64');
        var finalImg = {
            data:  Buffer.from(encode_img,'base64'),
            contentType: e.mimetype
        }
         images.push(finalImg);
    })
  

    var sell = new Sell({
        Name:object.name,
        Email:object.email,
        Phone_no:object.phone_no,
        Item_name:object.item_name,
        Category:object.category,
        Specifications:object.specifications,
        Image:images
    });
    sell.save()
    .then(()=>{
      //  res.redirect("/buysell");           //yahan success page ko render krna h agr save ho jata h toh vrna false ya btana h 
        res.send(req.files)                                    //db ke saare methods asynchronous hote uppar vali line chahe run na bhi huyi ho toh bhi next line chl jati h
    })
    .catch((err)=>{
        res.send(false)
    })
});
app.post("/buy",function(req,res){
    var object = req.body;
    console.log(object);
    Sell.find({ Category: { $in: object.category } },function(err,array){
        if(!err) res.render("Buy-Sell/sellCards",{array:array});
    })
});

//  Lost-Found
const lfSchema = new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true
    },
    Phone_no:{
        type:String,
        required:true
    },
    Title:{
        type:String,
        required:true
    },
    Post:{
        type:String,
        required:true
    },
    Category:{
        type:String,
        required:true
    },
    Image:[{
        data:Buffer,
        contentType:String
    }]
});
const lostFound = new mongoose.model("lostFound",lfSchema);

app.get("/lostfound",function(req,res){
    lostFound.find({Category:"lost"},{Title:1,Post:1},function(err,lostarray){
          if(!err){ 
              lostFound.find({Category:"found"},{Title:1,Post:1},function(error,foundarray){
               res.render("Lost-Found/home",{larray:lostarray,farray:foundarray})
           });
}
    });
});
app.get("/lostfound/:id",function(req,res){
    if(req.params.id==="report") res.render("Lost-Found/report");
    else{
    lostFound.findById(req.params.id,function(err,foundItem){
        res.render("Lost-Found/post",{object:foundItem});
    })
}
});

// app.get("/lostfound/report",function(req,res){
//     res.render("Lost-Found/report");
// })

app.post("/lostfound",upload.array('lfImages',4),function(req,res){
 var formdata = req.body;
 var images = [];
 console.log(req.files);
 req.files.forEach(function(e){
     var img = fs.readFileSync(e.path);
     var encode_img = img.toString('base64');
     var finalImg = {
         data:  Buffer.from(encode_img,'base64'),
         contentType: e.mimetype
     }
      images.push(finalImg);
 })
 console.log(formdata);
 var lostfound = new lostFound({
     Name:formdata.name,
     Email:formdata.email,
     Phone_no:formdata.phone_no,
     Category:formdata.category,
     Title:formdata.title,
     Post:formdata.post,
     Image:images
 });
 lostfound.save()
 .then(()=>{
  //   res.redirect("/lostfound");           //yahan success page ko render krna h agr save ho jata h toh vrna false ya btana h 
     res.send(req.files)                                    //db ke saare methods asynchronous hote uppar vali line chahe run na bhi huyi ho toh bhi next line chl jati h
 })
 .catch((err)=>{
     res.send(false)
 })
});

// 

app.use((req,res,next)=>{
    res.send("NOT FOUND");
})

app.listen(3000,function(){
    console.log("Server has started at port 3000");
})



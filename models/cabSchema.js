const mongoose = require("mongoose");
const Schema = mongoose.Schema

var cab = new Schema({
    Date:{
        type:String,
        required:true,
    },
    Name:{
        type:String,
        required:true
    },
    Email:String,
    Phone_no:String,
    Destination:String,
    Departure_time:String
})

var Cab=mongoose.model("cab",cab);
module.exports = Cab;
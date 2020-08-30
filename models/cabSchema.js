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
    Email:{
        type:String,
        default:undefined,
    },
    Phone_no:{
        type:String,
        required:true
    },
    Destination:{
        type:String,
        required:true
    },
    Departure_time:{
        type:String,
        default:undefined,
    }
})

var Cab=mongoose.model("cab",cab);
module.exports = Cab;
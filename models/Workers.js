const mongoose = require("mongoose")
const workSchema = new mongoose.Schema(
    {
        
        firstname:String,
        lastname:String,
        tid: {
            type:String,
            unique:true
        },
        email:String,
        phone:String,
        address:String,
        password:String,
        creation_date: {
            type: Date,
            default: Date.now
        }
    }
)

module.exports = mongoose.model("Workers", workSchema);
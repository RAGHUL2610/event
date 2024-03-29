const mongoose = require('mongoose');

const user = mongoose.Schema({
    Sname:{
        type:String,
        required:true
    },
    Squalification:{
        type:String,
        required:true
    },
    SDepartment:{
        type:String,
        required:true
    },
    SEmail:{
        type:String,
        unique:true,
        required:true
    },
    SPassword:{
        type:String,
        required:true
    }
})

const UserSchema = mongoose.model("Staff",user);
module.exports = UserSchema;

const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name:{type:String, require:true},
    email:{type:String, require:true},
    pass:{type:String, require:true},
    role:{type:String, enum:["CREATOR", "VIEWER", "VIEW_ALL"], default:"VIEWER"}
},
{versionKey:false});

const UserModel = mongoose.model("author", userSchema);

module.exports = {
    UserModel
}
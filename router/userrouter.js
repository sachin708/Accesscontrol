const express = require("express");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const { UserModel } = require("../middleware/userModel");


const userRoute = express.Router();

userRoute.post("/register", (req, res)=>{
      const{name, email, pass, role} = req.body;
    try{
        bcrypt.hash(pass, 4, async(err, hash)=> {
         if(err){
            res.json({msg:"something error"});
         } else {
            const user = new UserModel({name, email, pass:hash, role});
            await user.save();
            res.json({msg:"new user is register"});
        }
        });
    }catch(err){
        res.json({err});
    }
});

userRoute.post("/login", async(req, res)=>{

    const{email, pass} = req.body;
     try{
        const user =await UserModel.findOne({email})
        bcrypt.compare(pass, user.pass, (err, result)=> {
              if(err){
                res.json({msg:"worng pass"})
              }
              if(result){
                res.json({msg:"You are login..", Token:jwt.sign({ userID: user._id }, 'sachin')})
              }
        });
     }catch(err){
        res.json({msg:"Wrong credential"});
     }
});

module.exports = {
    userRoute
}
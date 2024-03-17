
const express = require("express");
const { auth } = require("../middleware/authmiddle");
const { BookModel } = require("../middleware/bookModel");
const { access } = require("../middleware/accessmiddle");
const { UserModel } = require("../middleware/userModel");

const roleroute = express.Router();

roleroute.get("/:ID", auth, access("VIEWER"), async(req, res)=>{
         const ID = req.params;
    try{
      const book = await BookModel.find({userID:ID});
      res.json({msg:"Display the book", book})
    }catch(err){
        res.json({err})
    }
});




roleroute.post("/adding", auth ,access("CREATOR","VIEWER"), async(req, res)=>{
    const{title, description, status} =req.body;
    const user = await UserModel.findOne({_id:req.userID});
    console.log(user);
    try{    
    const book = new BookModel({title, description, status, userID:user._id});
    await book.save();
    res.json({msg:"new book add"})
    } catch(err){
        res.json({err})
    }
});

roleroute.get("/all", auth, access("VIEW_ALL"), async(req, res)=>{

    try{
        const book = await BookModel.find();
        res.json({msg:"Display the all", book});
    } catch(err){
        res.json({err})
    }
});

roleroute.delete("/delete/:bookID", auth, access("CREATOR"), async(req, res)=>{
    const bookID = req.params;
    const payload = req.body;
    try{
     const book = await BookModel.findByIdAndDelete({_id:payload}, payload);
     res.json({msg:"Delete the book", book})
    }catch(err){
        res.json({err})
    }
})




module.exports = {
    roleroute
}
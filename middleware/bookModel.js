
 const mongoose = require("mongoose");

 const bookSchema = mongoose.Schema({
    title:String,
    description:String,
    status:String,
    userID:String
 });

 const BookModel = mongoose.model("books", bookSchema);

 module.exports = {
    BookModel
 };
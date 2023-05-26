const mongoose = require("mongoose"); 
const MessageSchema = new mongoose.Schema({
  
    conversationId: String,
    authorId: String,
    content: String,

  },{timestamps:true});
  
  const Message = mongoose.model("message", MessageSchema, "message");
  module.exports = Message
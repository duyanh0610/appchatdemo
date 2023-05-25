const mongoose = require("mongoose"); 
const MessageSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    conversationId: String,
    authorId: String,
    content: String,
    createdDate: Date,
  });
  
  const Message = mongoose.model("message", MessageSchema, "message");
  module.exports = Message
const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema({
    name: String,
    participants: [String],
    
  }, {timestamps:true});
  const Conversation = mongoose.model(
    "conversation",
    ConversationSchema,
    "conversation"
  );
  module.exports = Conversation
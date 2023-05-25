const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: String,
    participants: [String],
  });
  const Conversation = mongoose.model(
    "conversation",
    ConversationSchema,
    "conversation"
  );
  module.exports = Conversation
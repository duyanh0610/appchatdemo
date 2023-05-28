const { default: mongoose } = require("mongoose");
const Conversation = require("../models/Conversations");

const createConversation = async (req, res) => {
  const { firstId, secondId } = req.body;
  try {
    const conversation = await Conversation.findOne({
      participants: { $all: [firstId, secondId] },
    });
    if (conversation) {
      return res.status(200).json(conversation);
    }
    const newConversation = new Conversation();
    newConversation.name = req.body.name;
    newConversation.participants = [firstId, secondId];
    

    const rs = await newConversation.save();
    res.status(201).json(rs);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const getUserConversations = async (req, res) => {
  const { userId } = req.params;
  console.log(userId)
  try {
    const conversations = await Conversation.find({
      participants: { $in: [userId] },
    });
    res.status(200).json(conversations);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const getUserSingleConversation = async (req, res) => {
  const { firstId, secondId } = req.params;
  try {
    const conversation = await Conversation.findOne({
      participants: { $all: [firstId, secondId] },
    });
    if (conversation) {
      return res.status(200).json(conversation);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const getUserGroupConversation = async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      $and: [
        { _id: new mongoose.Types.ObjectId(conversationId) },
        { participants: { $elemMatch: { userId } } },
      ],
    });
    if (!conversation) {
      return res.status(404).json({ message: "conversation not found" });
    }

    res.status(200).json({ conversation, userId: userId });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

module.exports = {
  createConversation,
  getUserSingleConversation,
  getUserConversations,
  getUserGroupConversation
};

const Message = require("../models/Message");

const createMessage = async (req, res) => {
  const { conversationId, authorId, content } = req.body;

  try {
    const message = new Message();
    message.conversationId = conversationId;
    message.authorId = authorId;
    message.content = content;
    const rs = await message.save();
    return res.status(200).json(rs);
  } catch (err) {
    console.log("Error: " + err);
    res.status(500).json(err);
  }
};
const getMessages = async (req, res) => {
  const { conversationId } = req.params;

  try {
    const messages = await Message.find({conversationId}).sort({createdAt: 1});
    return res.status(200).json(messages);
  } catch (err) {
    console.log("Error: " + err);
    res.status(500).json(err);
  }
};

module.exports = { createMessage, getMessages };

const expres = require('express');
const ConversationController = require('../controller/ConversationController');

const router = expres.Router();

router.post('/:userId/chat',ConversationController.createConversation)
router.get('/:userId/chats',ConversationController.getUserConversations)
router.get('/:firstId/:secondId/chat',ConversationController.getUserSingleConversation)


module.exports = router
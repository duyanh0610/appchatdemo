const express = require('express')
const { createMessage, getMessages } = require('../controller/MessageController')

const router = express.Router()

router.post('/',createMessage)
router.get('/',getMessages)

module.exports = router
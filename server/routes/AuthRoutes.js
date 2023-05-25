const express = require('express')

const router = express.Router();

const AuthController = require('../controller/AuthController')
router.post("/signin",AuthController.signin)

router.post("/signup",AuthController.signup)

module.exports = router

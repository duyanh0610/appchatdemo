const express = require('express')

const router = express.Router();

const UserController = require('../controller/UserController')
router.get("/find/:id",UserController.findUser)
router.get("/findMany",UserController.findUsers)

// router.post("/signup",UserController.signup)

module.exports = router
 
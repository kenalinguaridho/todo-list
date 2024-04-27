const
    express = require('express'),
    userRouter = express.Router(),
    { UserController } = require('../controllers/userController')

userRouter
    .post('/register', UserController.register)

module.exports = userRouter
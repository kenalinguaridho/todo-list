const
    express = require('express'),
    userRouter = express.Router(),
    { UserController } = require('../controllers/userController')

userRouter
    .post('/register', UserController.register)
    .post('/login', UserController.login)

module.exports = userRouter
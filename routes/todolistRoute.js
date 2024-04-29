const
    express = require('express'),
    passport = require('../lib/passport'),
    Auth = require('../lib/auth'),
    toDoListRoute = express.Router(),
    { ToDoListController } = require('../controllers/todolistController')

toDoListRoute.use(passport.initialize(), Auth.authentication)

toDoListRoute
    .post('/todolist', ToDoListController.create)
    .get('/todolist', ToDoListController.getToDoList)
    .patch('/todolist/:id', ToDoListController.updateToDoListStatus)
    .delete('/todolist/:id', ToDoListController.deleteToDoList)

module.exports = toDoListRoute
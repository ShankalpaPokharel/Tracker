const express = require("express")
const router = express.Router()

const todoController = require('../controllers/todo.controller')

router.post('/addTodo',todoController.addTodo)
router.get('/getTodo',todoController.getTodo)
router.put('/editTodo',todoController.editTodo)
router.delete('/deleteTodo/:id',todoController.deleteTodo)

module.exports = router
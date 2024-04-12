const express = require("express")
const app = express()
const cors = require("cors")
app.use(cors())


const todoRouter = require('./routes/todo.route')
const shoppingListRouter = require('./routes/shoppingList.route')

app.use(express.json())

app.use('/api/todo',todoRouter)
app.use('/api/shoppingList', shoppingListRouter)


module.exports = app
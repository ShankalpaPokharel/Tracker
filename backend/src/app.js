const express = require("express")
const app = express()
const cors = require("cors")
app.use(cors())


const todoRouter = require('./routes/todo.route')
app.use(express.json())
app.use('/api/todo',todoRouter)


module.exports = app
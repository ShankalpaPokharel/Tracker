require('dotenv').config()

const connectDB = require('./db/index')
const app = require('./app')

connectDB()
.then(()=>{
    app.listen(4000,()=>{
        console.log("Server is running")
    })
})
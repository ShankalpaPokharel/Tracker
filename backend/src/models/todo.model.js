const mongoose = require("mongoose")

const TodoSchema = new mongoose.Schema({
    task:{type:String, require:true},
    status:{type:Boolean, default:false}
})

const Todo = mongoose.model("Todo",TodoSchema)
module.exports = Todo;
const Todo = require("../models/todo.model");

exports.addTodo = async (req, res) => {
    console.log("enter in add todo")
    try {
        const {task} = req.body;
        const todo = await Todo.create({ task });
        console.log(todo)
        res.send(todo);
    } catch (error) {
        console.log(error);
    }
};

exports.getTodo = async(req,res)=>{
    try{
        const todos = await Todo.find()
        res.send(todos)
    }catch(error){
        console.log(error)
    }
}

exports.editTodo = async(req,res) =>{

    try {
        const updatedData = req.body

        const updatedTodo = await Todo.findByIdAndUpdate(updatedData.id,updatedData,{new:true})
    
        res.send(updatedData)
    
    } catch (error) {
        console.log(error)
    }
    
   
    

}

exports.deleteTodo = async(req,res)=>{
    try {
        const {id} =req.params;
        console.log("_id",id)
        const delTodo = await Todo.findByIdAndDelete(id)
        
        res.send(true)
    } catch (error) {
        console.log(error)
    }
    
    
}

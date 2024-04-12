const mongoose = require("mongoose")

const ShoppingListSchema =  new mongoose.Schema({
    name:{type:String, required:true },
    quantity:{type:Number,required:true} 
})

const ShoppingList = mongoose.model("ShoppingList",ShoppingListSchema)

module.exports = ShoppingList
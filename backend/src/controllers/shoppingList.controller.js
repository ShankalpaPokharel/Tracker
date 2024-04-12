const ShoppingList = require("../models/shoppingList.model")

exports.addList = async(req,res) =>{
    try {
        const itemQuantity = req.body
        // console.log(items)
        // const itemQuantity ={item:items.name,quantity:items.quantity}
        const shoppingList = await ShoppingList.create(itemQuantity)
        console.log(shoppingList)
        res.send(shoppingList)
        
    } catch (error) {
        console.log("addList ERROR" ,error)
    }  
}

exports.getList = async(req,res) =>{
    try{
        const shoppingLists = await ShoppingList.find()
        res.send(shoppingLists)
    }
    catch(error){
        console.log(error)
    }
}

exports.editList = async(req,res)=>{
    try {
       const editValue = req.body
       
       const editedValue = await ShoppingList.findByIdAndUpdate(editValue._id,editValue,{new:true})
       console.log(editedValue)
       res.send(editedValue)

    } catch (error) {
        console.log(error)
    }
}


exports.deleteList = async(req,res)=>{
    console.log("entering in delete")
    try{
        const id = req.params.id
        console.log(id)
        const deleteList = await ShoppingList.findByIdAndDelete(id)
        if(deleteList) return res.send(true)

        console.log("Problem in delete")
        
    }catch(error){
        console.log(error)
    }
}
const express = require("express")
const router = express.Router()
const shoppingListController = require("../controllers/shoppingList.controller")

router.post('/addList',shoppingListController.addList)
router.get('/getList',shoppingListController.getList)
router.put('/editList',shoppingListController.editList)
router.delete('/deleteList/:id', shoppingListController.deleteList)

module.exports = router
const express = require("express")
const todoController = require("../controller/todo")
const router = express.Router()

router.get("/", todoController.listTodo)
router.get("/:id",todoController.listTodo)
router.post("/",todoController.post_route)
router.delete("/:id",todoController.delete_id)
router.put("/:id",todoController.put_id)

module.exports = router;
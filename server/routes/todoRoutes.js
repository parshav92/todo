const router = require("express").Router();
const todoController = require("../controllers/todoControllers");

router.get("/", todoController.getTodos);
router.post("/", todoController.createTodo);
router.put("/:id", todoController.patchTodo);
router.delete("/:id", todoController.deleteTodo);
router.delete("/", todoController.deleteAllTodos);

module.exports = router;

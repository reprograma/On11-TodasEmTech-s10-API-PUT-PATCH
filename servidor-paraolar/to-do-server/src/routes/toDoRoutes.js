const express = require("express")
const router = express.Router()
const controller = require("../controllers/toDoController")

router.get("/", controller.getAll)
router.get("/:id", controller.getById)

router.post("/cadastrar", controller.createTask)

router.put("/:id", controller.replaceToDo)

router.patch("/updateDescricao/:id", controller.updateDescricao)
router.patch("/update/:id", controller.updateAnything)

router.delete("/:id", controller.deleteTask)

module.exports = router
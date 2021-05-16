const express = require("express")
const router = express.Router()
const controller = require("../controllers/toDoController")

router.get("/", controller.getAll)
router.get("/:id", controller.getById)

router.post("/cadastrar", controller.createTask)

router.put("/:id", controller.replaceTask)

router.patch("/updateTitle/:id", controller.updateTask)
router.patch("/update/:id", controller.updateAnything)

router.delete("/:id", controller.deleteTask)

module.exports = router
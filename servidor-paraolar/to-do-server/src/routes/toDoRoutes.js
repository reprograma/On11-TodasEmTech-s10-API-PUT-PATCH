const express = require("express")
const router = express.Router()
const controller = require("../controllers/toDoController")

router.get("/", controller.getAll)

router.post("/cadastrar", controller.createTask)
router.put("/:id", controller.updateTask),

router.delete("/:id", controller.deleteTask)
router.get("/:id", controller.getById)
router.patch("/:id", controller.updateAnything)


module.exports = router
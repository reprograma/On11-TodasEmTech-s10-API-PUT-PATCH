const express = require("express")
const router = express.Router()
const controller = require("../controllers/toDoController")

router.get("/", controller.getAll)
router.get("/:id", controller.getById)

router.post("/createTask", controller.createTask)
router.put("/replaceTask", controller.replaceTask)
router.patch("/updateName", controller.updateName)


router.delete("/:id", controller.deleteTask)

module.exports = router
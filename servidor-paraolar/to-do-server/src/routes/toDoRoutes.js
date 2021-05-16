const express = require("express")
const router = express.Router()
const controller = require("../controllers/toDoController")


router.get("/", controller.getAll)
router.get("/:id", controller.getById)

router.post("/cadastrar", controller.createTask)

router.patch("/atualizar/:id", controller.upDate)

router.delete("/:id", controller.deleteTask)

router.put("/substituir/:id", controller.put)



module.exports = router
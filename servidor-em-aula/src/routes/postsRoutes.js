const express = require ("express") // Chama o express
const router = express.Router() // Executa o Router
const controller = require("../controllers/postsControllers") // Chama o controller

router.get("/", controller.getAll)
router.get("/:id", controller.getById)

router.post("/create", controller.createPost)

router.put("/:id", controller.replacePost)

router.patch("/updateTitle/:id", controller.updateTitle)
router.patch("/update/:id", controller.updateAnything)

router.delete("/:id", controller.deletePost)

module.exports = router; 
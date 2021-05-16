const express = require("express")
const router = express.Router()

const controller = require("../controllers/postsController")

router.get("/", controller.getAll)
router.get("/:id", controller.getById)

router.post("/create", controller.creatPost)

router.put("/:id", controller.replacePost)

router.patch("/updateTitle/:id", controller.updateTitle)
router.patch("/update/:id", controller.updateAnything)

router.delete("/:id", controller.deletePost)

module.exports = router;
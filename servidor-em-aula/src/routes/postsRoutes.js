const express = require ("express")
const router = express.Router()

const controller = require("../controllers/postsControllers")

router.get("/", controller.getAll)
router.get("/:id", controller.getById)

router.post("/creat", controller.creatPost)

router.put("/:id", controller.replacePost)

router.patch("/updateTitle/:id", controller.updateTitle)

router.patch("/update/:id", controller.updateAnything)

router.delete("/:id", controller.deletePost)


module.exports = router;
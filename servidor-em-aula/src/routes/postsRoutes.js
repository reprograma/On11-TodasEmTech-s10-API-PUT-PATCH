const express = require ("express")
const router = express.Router()

const controller = require("../controllers/postsControllers")

router.get("/", controller.getAll)
router.get("/:id", controller.getById)

router.post("/create", controller.creatPost)

router.put("/:id", controller.replacePost)


router.patch("/updateTitle", controller.updateTitle)
//router.patch("/", controller.) /posts/update/:id

router.patch("/posts/update/:id", controller.updateAnything)



router.delete("/:id", controller.deletePost)


module.exports = router;
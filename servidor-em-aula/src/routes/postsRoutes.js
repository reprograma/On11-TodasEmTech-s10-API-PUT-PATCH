const express = require ("express")
const router = express.Router()

const controller = require("../controlles/postsControllers")

router.get("/", controller.getAll )
router.get("/:id", controller.getById)
router.delete("/:id", controller.deletePost)
router.post("/create", controller.createPost)

module.exports = router;

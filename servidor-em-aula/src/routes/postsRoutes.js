const express = require('express')
const controller = require('../controllers/postsControllers')

const router = express.Router()

router.get("/", controller.getAll)
router.get("/:id", controller.getById)

router.post("/create", controller.createPost)

router.put("/:id", controller.replacePost)

router.patch('/updateTitle/:id', controller.updateTitle)
router.patch('/update/:id', controller.updateAnything)

router.delete('/:id', controller.deletePost)

module.exports = router
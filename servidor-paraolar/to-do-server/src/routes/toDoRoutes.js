router.post("/cadastrar", controller.createTask)

router.put("/:id", controller.replaceTask)

router.patch("/updateName/:id", controller.updateName)
router.patch("/update/:id", controller.updateAnything)

router.delete("/:id", controller.deleteTask)

module.exports = router 
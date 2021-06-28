router.get("/title", controller.getByTitle)
router.get("/genre", controller.getByGenre)
router.get("/:id", controller.getById)
router.post("/cadastrar", controller.createTask)
router.delete("/:id", controller.deleteTask)
router.put("/:id", controller.replaceFilme)



module.exports = router //exportando o router
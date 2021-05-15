router.get("/genre", controller.getByGenre)
router.get("/:id", controller.getById)
router.post("/cadastrar", controller.cadastrarFilmes)
router.put("/:id", controller.atualizarFilmes)
router.patch("/atualizar/:id", controller.patchFilmes)
router.delete("/:id", controller.deleteFilme)


module.exports = router //exportando o router 
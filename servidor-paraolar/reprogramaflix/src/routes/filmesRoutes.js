const controller  = require("../controllers/filmesController")//chama o controler

const express = require("express")//chamando o express 
const router = express.Router()//executando Router

router.get("/todos", controller.getAll)//configurando continuação da rota e dizendo q ela vai usar a função getAll que esta no controller
router.get("/title", controller.getByTitle)
router.get("/genre", controller.getByGenre)
router.get("/:id", controller.getById)

router.post("/create", controller.createFilm)

router.put("/:id", controller.replaceFilms)

router.patch("/updateTitle/:id", controller.updateTitle)

router.delete("/:id", controller.deleteFilm)


module.exports = router //exportando o router

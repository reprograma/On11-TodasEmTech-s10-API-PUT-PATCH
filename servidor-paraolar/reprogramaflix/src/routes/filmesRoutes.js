const controller  = require("../controllers/filmesController")//chama o controler

const express = require("express")//chamando o express 
const router = express.Router()//executando Router

router.get("/todos", controller.getAll)//configurando continuação da rota e dizendo q ela vai usar a função getAll que esta no controller
router.get("/title", controller.getByTitle)
router.get("/genre", controller.getByGenre)
router.post("/create", controller.createFilm)
router.delete("/:id", controller.deleteMovie)
router.get("/:id", controller.getById)
router.put("/:id", controller.updateMovie)
router.patch("/:id", controller.updateAnythingMovie)



module.exports = router //exportando o router